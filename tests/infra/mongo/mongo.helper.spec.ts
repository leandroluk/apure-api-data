import { IIndexable } from "$/domain/generics";
import { ISchema, mongoHelper } from "$/infra/mongo";
import { vars } from "$/vars";
import { MongoClient } from "mongodb";

describe("infra/mongo/mongo.helper", () => {
  describe("connect", () => {
    it("should throw if can't connect to db", async () => {
      jest.spyOn(MongoClient, "connect").mockRejectedValueOnce(new Error());
      await expect(mongoHelper.connect()).rejects.toThrow();
    });

    it("should define mongoHelper.client if connect to db", async () => {
      jest.spyOn(MongoClient, "connect").mockResolvedValueOnce({} as any);
      await mongoHelper.connect();
      expect(mongoHelper.client).toBeDefined();
    });
  });

  describe("collection", () => {
    it("should return collection", async () => {
      mongoHelper.client = { db: np({ collection: np("") }) } as any;
      expect(mongoHelper.collection("")).toBeDefined();
    });
  });

  describe("search", () => {
    const schema: ISchema<IIndexable & { full: string; field: string; }> = {
      collection: "example",
      fullTextFields: ["full"],
      projection: { _id: "$_id", field: "$field", full: "$full" }
    };

    const makeAggregateSpy = () => {
      const aggregate = jest.fn().mockReturnValue({
        toArray: async () => [{ items: [{}], total: 1 }]
      });
      jest.spyOn(mongoHelper, "collection")
        .mockReturnValueOnce({ aggregate } as any);
      return aggregate;
    };

    it("should not add FTS stage when use text but schema no have has FTS fields", async () => {
      const aggregateSpy = makeAggregateSpy();
      const schemaWithoutFTS = { ...schema, fullTextFields: [] };
      await mongoHelper.search(schemaWithoutFTS, { text: "text" });
      expect(aggregateSpy.mock.lastCall[0]).not.toContainEqual({
        $match: {
          $or: [{
            full: {
              $regex: "text"
            }
          }]
        }
      });
    });

    it("should add FTS stage when use text and schema has FTS fields", async () => {
      const aggregateSpy = makeAggregateSpy();
      await mongoHelper.search(schema, { text: "text" });
      expect(aggregateSpy.mock.lastCall[0]).toContainEqual({
        $match: {
          $or: [{
            full: {
              $regex: "text"
            }
          }]
        }
      });
    });

    it.each([
      [{ eq: "value" }, { field: { $eq: "value" } }],
      [{ gt: "value" }, { field: { $gt: "value" } }],
      [{ gte: "value" }, { field: { $gte: "value" } }],
      [{ in: ["value"] }, { field: { $in: ["value"] } }],
      [{ like: "value" }, { field: { $regex: "value" } }],
      [{ lt: "value" }, { field: { $lt: "value" } }],
      [{ lte: "value" }, { field: { $lte: "value" } }],
      [{ neq: "value" }, { field: { $not: { $eq: "value" } } }],
      [{ ngt: "value" }, { field: { $not: { $gt: "value" } } }],
      [{ ngte: "value" }, { field: { $not: { $gte: "value" } } }],
      [{ nin: ["value"] }, { field: { $not: { $in: ["value"] } } }],
      [{ nlike: "value" }, { field: { $not: { $regex: "value" } } }],
      [{ nlt: "value" }, { field: { $not: { $lt: "value" } } }],
      [{ nlte: "value" }, { field: { $not: { $lte: "value" } } }]
    ])("should add matcher stage when query.where %p is passed", async (field, expected) => {
      const aggregateSpy = makeAggregateSpy();
      await mongoHelper.search(schema, { where: { field } } as any);
      expect(aggregateSpy.mock.lastCall[0]).toContainEqual({
        $match: expected
      });
    });

    it("should sort items if query.sort is passed", async () => {
      const aggregateSpy = makeAggregateSpy();
      await mongoHelper.search(schema, { sort: { field: -1 } });
      expect(aggregateSpy.mock.lastCall[0]).toContainEqual({
        $sort: {
          field: -1
        }
      });
    });

    it("should use default projection if no pass query.fields", async () => {
      const aggregateSpy = makeAggregateSpy();
      await mongoHelper.search(schema, {});
      expect(aggregateSpy.mock.lastCall[0]).toContainEqual({
        $facet: {
          items: [
            { $limit: vars.db.limit },
            { $skip: 0 },
            { $project: schema.projection }
          ],
          total: [
            { $count: "total" },
            { $first: "$total" }
          ]
        }
      });
    });

    it("should remove fields from projection when pass query.fields.remove", async () => {
      const aggregateSpy = makeAggregateSpy();
      await mongoHelper.search(schema, { fields: { remove: ["field"] } });
      expect(aggregateSpy.mock.lastCall[0]).toContainEqual({
        $facet: {
          items: [
            { $limit: vars.db.limit },
            { $skip: 0 },
            { $project: { _id: "$_id", full: "$full" } }
          ],
          total: [
            { $count: "total" },
            { $first: "$total" }
          ]
        }
      });
    });

    it("should select fields from projection when pass query.fields.select", async () => {
      const aggregateSpy = makeAggregateSpy();
      await mongoHelper.search(schema, { fields: { select: ["field"] } });
      expect(aggregateSpy.mock.lastCall[0]).toContainEqual({
        $facet: {
          items: [
            { $limit: vars.db.limit },
            { $skip: 0 },
            { $project: { field: "$field" } }
          ],
          total: [
            { $count: "total" },
            { $first: "$total" }
          ]
        }
      });
    });

    it("should set offset and limit when is passed", async () => {
      const aggregateSpy = makeAggregateSpy();
      await mongoHelper.search(schema, { limit: 123, offset: 456 });
      expect(aggregateSpy.mock.lastCall[0]).toContainEqual({
        $facet: {
          items: [
            { $limit: 123 },
            { $skip: 456 },
            { $project: schema.projection }
          ],
          total: [
            { $count: "total" },
            { $first: "$total" }
          ]
        }
      });
    });

    it("should return ISearch.Result if success", async () => {
      makeAggregateSpy();
      await expect(mongoHelper.search(schema, {})).resolves.toEqual({
        items: [{}],
        total: 1,
        limit: vars.db.limit,
        offset: 0
      });
    });
  });
});
