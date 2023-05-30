import { IIndexable, ISearch } from "$/domain/generics";
import { vars } from "$/vars";
import { ClientSession, Collection, MongoClient } from "mongodb";
import { ISchema } from "./types";

type Any = string | string[] | number | number[] | Date | Date[];

const operatorsMap = {
  eq: (value: Any) => ({ $eq: value }),
  gt: (value: Any) => ({ $gt: value }),
  gte: (value: Any) => ({ $gte: value }),
  in: (value: Any) => ({ $in: value }),
  like: (value: Any) => ({ $regex: value }),
  lt: (value: Any) => ({ $lt: value }),
  lte: (value: Any) => ({ $lte: value }),
  neq: (value: Any) => ({ $not: { $eq: value } }),
  ngt: (value: Any) => ({ $not: { $gt: value } }),
  ngte: (value: Any) => ({ $not: { $gte: value } }),
  nin: (value: Any) => ({ $not: { $in: value } }),
  nlike: (value: Any) => ({ $not: { $regex: value } }),
  nlt: (value: Any) => ({ $not: { $lt: value } }),
  nlte: (value: Any) => ({ $not: { $lte: value } })
};

export const mongoHelper = {
  client: null as MongoClient,
  /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
  sessions: {} as Record<string, ClientSession>,
  async connect (): Promise<void> {
    mongoHelper.client = await MongoClient.connect(vars.db.mongo);
  },

  collection<T> (collectionName: string): Collection<T> {
    const collection = mongoHelper.client.db().collection(collectionName);
    return collection as unknown as Collection<T>;
  },

  async search<T extends IIndexable> (
    schema: ISchema<T>,
    { text, where, sort, fields, offset = 0, limit = vars.db.limit }: ISearch.Query<T>
  ): Promise<ISearch.Result<T>> {
    const aggregation = [];

    if (text && schema.fullTextFields.length) {
      aggregation.push({
        $match: {
          $or: schema.fullTextFields.map(field => ({
            [field]: operatorsMap.like(text)
          }))
        }
      });
    }

    if (where) {
      const $match = {};
      for (const [field, condition] of Object.entries(where)) {
        for (const [op, value] of Object.entries(condition)) {
          $match[field] = { ...$match[field], ...operatorsMap[op](value) };
        }
      }
      aggregation.push({ $match });
    }

    if (sort) {
      aggregation.push({ $sort: sort });
    }

    const projection = fields
      ? Object.keys(schema.projection)
        .filter(fields.remove
          ? (key: string & keyof T) => !fields.remove.includes(key)
          : (key: string & keyof T) => fields.select.includes(key))
        .reduce((obj, key) => ({ ...obj, [key]: schema.projection[key] }), {})
      : schema.projection;

    aggregation.push({
      $facet: {
        items: [{ $limit: limit }, { $skip: offset }, { $project: projection }],
        total: [{ $count: "total" }, { $first: "$total" }]
      }
    });

    const [{ items, total }] = await mongoHelper
      .collection(schema.collection)
      .aggregate(aggregation).toArray();

    return {
      items,
      total,
      offset,
      limit
    };
  },

  async startSession (): Promise<string> {
    if (mongoHelper.client) {
      const session = mongoHelper.client.startSession();
      session.startTransaction();
      const id = `${session.id.id.toUUID()}`;
      mongoHelper.sessions[id] = session;
      return id;
    }
  },

  async endSession (id: string, error?: Error): Promise<void> {
    if (mongoHelper.sessions[id]) {
      const method = error ? "abort" : "commit";
      await mongoHelper.sessions[id][`${method}Transaction`]();
      await mongoHelper.sessions[id].endSession();
    }
  }
};
