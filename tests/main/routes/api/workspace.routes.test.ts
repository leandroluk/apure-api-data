import { mongoHelper } from "$/infra/mongo";
import { app } from "$/main";
import { mockAuthenticatedHeader } from "mocks/domain/generics";
import { mockAccount, mockWorkspace } from "mocks/domain/models";
import supertest from "supertest";

describe("main/routes/api/workspace.routes", () => {
  describe("DELETE /api/workspace/:workspace_id/restore", () => {
    const url = "/api/workspace/workspace_id/restore";

    it.each([
      ['"authorization" is empty', { authorization: "" }],
      ['"authorization" must start with Bearer', { authorization: "token" }]
    ])("should return 400 if %p on header", async (_, invalidHeaders) => {
      const result = await supertest(app)
        .delete(url)
        .set(invalidHeaders);

      expect(result.status).toBe(400);
    });

    it("should return 401 if request is unauthorized", async () => {
      const result = await supertest(app)
        .delete(url)
        .set({ authorization: "Bearer token" });

      expect(result.status).toBe(401);
    });

    it("should return 404 if workspace not found", async () => {
      jest.spyOn(mongoHelper, "collection")
        // get account by email
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockAccount]) }) }) } as any)
        // get workspace
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([]) }) }) } as any);

      const result = await supertest(app)
        .delete(url)
        .set(mockAuthenticatedHeader);

      expect(result.status).toBe(404);
    });

    it("should return 204 if enabled workspace", async () => {
      const disabledWorkspace = { ...mockWorkspace, _removed: new Date() };
      jest.spyOn(mongoHelper, "collection")
        // get account by email
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockAccount]) }) }) } as any)
        // get workspace
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([disabledWorkspace]) }) }) } as any)
        // edit workspace
        .mockReturnValueOnce({ findOneAndUpdate: np() } as any);

      const result = await supertest(app)
        .delete(url)
        .set(mockAuthenticatedHeader);

      expect(result.status).toBe(200);
      expect(result.body._id).toBe(disabledWorkspace._id);
      expect(result.body._timestamp).not.toBe(disabledWorkspace._timestamp.toJSON());
      expect(result.body._created).toBe(disabledWorkspace._created.toJSON());
      expect(result.body._removed).toBeNull();
      expect(result.body.name).toBe(disabledWorkspace.name);
      expect(result.body.ownerCnpj).toBe(disabledWorkspace.ownerCnpj);
    });
  });

  describe("PUT /api/workspace/:workspace_id", () => {
    const url = "/api/workspace/workspace_id";
    const validBody = {
      name: "Example",
      ownerCnpj: "75748633000181"
    };

    it.each([
      ['"authorization" is empty', { authorization: "" }],
      ['"authorization" must start with Bearer', { authorization: "token" }]
    ])("should return 400 if %p on header", async (_, invalidHeaders) => {
      const result = await supertest(app)
        .put(url)
        .set(invalidHeaders)
        .send(validBody);

      expect(result.status).toBe(400);
    });

    it.each([
      ['"name" is empty', { ...validBody, name: "" }],
      ['"name" is not a string', { ...validBody, name: 1 }],
      ['"name" must lower than 100', { ...validBody, name: "".padStart(101, "a") }],
      ['"ownerCnpj" is empty', { ...validBody, ownerCnpj: "" }],
      ['"ownerCnpj" is not a string', { ...validBody, ownerCnpj: 1 }],
      ['"ownerCnpj" must be a valid cnpj', { ...validBody, ownerCnpj: "11222333000144" }]
    ])("should return 400 if %p on body", async (_, invalidBody) => {
      const result = await supertest(app)
        .put(url)
        .set(mockAuthenticatedHeader)
        .send(invalidBody);

      expect(result.status).toBe(400);
    });

    it("should return 401 if request is unauthorized", async () => {
      const result = await supertest(app)
        .put(url)
        .set({ authorization: "Bearer token" })
        .send(validBody);

      expect(result.status).toBe(401);
    });

    it("should return 404 if workspace not found", async () => {
      jest.spyOn(mongoHelper, "collection")
        // get account by email
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockAccount]) }) }) } as any)
        // get workspace
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([]) }) }) } as any);

      const result = await supertest(app)
        .put(url)
        .set(mockAuthenticatedHeader)
        .send(validBody);

      expect(result.status).toBe(404);
    });

    it("should return 200 if edit workspace", async () => {
      jest.spyOn(mongoHelper, "collection")
        // get account by email
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockAccount]) }) }) } as any)
        // get workspace
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockWorkspace]) }) }) } as any)
        // edit workspace
        .mockReturnValueOnce({ findOneAndUpdate: np() } as any);

      const result = await supertest(app)
        .put(url)
        .set(mockAuthenticatedHeader)
        .send(validBody);

      expect(result.status).toBe(200);
      expect(result.body._id).toBeDefined();
      expect(result.body._timestamp).not.toBe(mockWorkspace._timestamp.toJSON());
      expect(result.body._created).toBe(mockWorkspace._created.toJSON());
      expect(result.body._removed).toBeNull();
      expect(result.body.name).toBe(validBody.name);
      expect(result.body.ownerCnpj).toBe(validBody.ownerCnpj);
    });
  });

  describe("DELETE /api/workspace/:workspace_id", () => {
    const url = "/api/workspace/workspace_id";

    it.each([
      ['"authorization" is empty', { authorization: "" }],
      ['"authorization" must start with Bearer', { authorization: "token" }]
    ])("should return 400 if %p on header", async (_, invalidHeaders) => {
      const result = await supertest(app)
        .delete(url)
        .set(invalidHeaders);

      expect(result.status).toBe(400);
    });

    it("should return 401 if request is unauthorized", async () => {
      const result = await supertest(app)
        .delete(url)
        .set({ authorization: "Bearer token" });

      expect(result.status).toBe(401);
    });

    it("should return 404 if workspace not found", async () => {
      jest.spyOn(mongoHelper, "collection")
        // get account by email
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockAccount]) }) }) } as any)
        // get workspace
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([]) }) }) } as any);

      const result = await supertest(app)
        .delete(url)
        .set(mockAuthenticatedHeader);

      expect(result.status).toBe(404);
    });

    it("should return 204 if disable workspace", async () => {
      jest.spyOn(mongoHelper, "collection")
        // get account by email
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockAccount]) }) }) } as any)
        // get workspace
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockWorkspace]) }) }) } as any)
        // edit workspace
        .mockReturnValueOnce({ findOneAndUpdate: np() } as any);

      const result = await supertest(app)
        .delete(url)
        .set(mockAuthenticatedHeader);

      expect(result.status).toBe(204);
    });
  });

  describe("POST /api/workspace", () => {
    const url = "/api/workspace";
    const validBody = {
      name: "Example",
      ownerCnpj: "75748633000181"
    };

    it.each([
      ['"authorization" is empty', { authorization: "" }],
      ['"authorization" must start with Bearer', { authorization: "token" }]
    ])("should return 400 if %p on header", async (_, invalidHeaders) => {
      const result = await supertest(app)
        .post(url)
        .set(invalidHeaders)
        .send(validBody);

      expect(result.status).toBe(400);
    });

    it.each([
      ['"name" is required', { ...validBody, name: undefined }],
      ['"name" is empty', { ...validBody, name: "" }],
      ['"name" is not a string', { ...validBody, name: 1 }],
      ['"name" must lower than 100', { ...validBody, name: "".padStart(101, "a") }],
      ['"ownerCnpj" is required', { ...validBody, ownerCnpj: undefined }],
      ['"ownerCnpj" is empty', { ...validBody, ownerCnpj: "" }],
      ['"ownerCnpj" is not a string', { ...validBody, ownerCnpj: 1 }],
      ['"ownerCnpj" must be a valid cnpj', { ...validBody, ownerCnpj: "11222333000144" }]
    ])("should return 400 if %p on body", async (_, invalidBody) => {
      const result = await supertest(app)
        .post(url)
        .set(mockAuthenticatedHeader)
        .send(invalidBody);

      expect(result.status).toBe(400);
    });

    it("should return 401 if request is unauthorized", async () => {
      const result = await supertest(app)
        .post(url)
        .set({ authorization: "Bearer token" })
        .send(validBody);

      expect(result.status).toBe(401);
    });

    it("should return 201 if add workspace", async () => {
      jest.spyOn(mongoHelper, "collection")
        // get account by email
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockAccount]) }) }) } as any)
        // add workspace
        .mockReturnValueOnce({ insertOne: np() } as any)
        // add workspaceAccount
        .mockReturnValueOnce({ insertOne: np() } as any);

      const result = await supertest(app)
        .post(url)
        .set(mockAuthenticatedHeader)
        .send(validBody);

      expect(result.status).toBe(201);
      expect(result.body._id).toBeDefined();
      expect(result.body._timestamp).toBeDefined();
      expect(result.body._created).toBeDefined();
      expect(result.body._removed).toBeNull();
      expect(result.body.name).toBe(validBody.name);
      expect(result.body.ownerCnpj).toBe(validBody.ownerCnpj);
    });
  });
});
