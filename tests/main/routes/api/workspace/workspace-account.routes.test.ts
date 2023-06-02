import { IWorkspaceAccount } from "$/domain/models";
import { mongoHelper } from "$/infra/mongo";
import { app } from "$/main";
import { mockAuthenticatedHeader } from "mocks/domain/generics";
import { mockAccount, mockWorkspace, mockWorkspaceAccount } from "mocks/domain/models";
import supertest from "supertest";

describe("main/routes/api/workspace/workspace-account.routes", () => {
  describe("POST /api/workspace/:workspace_id/account", () => {
    const url = "/api/workspace/workspace_id/account";
    const validBody = {
      account_id: "account_id",
      roles: ["admin"]
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
      ['"account_id" is required', { ...validBody, account_id: undefined }],
      ['"account_id" is empty', { ...validBody, account_id: "" }],
      ['"account_id" is not a string', { ...validBody, account_id: 1 }],
      ['"roles" is required', { ...validBody, roles: undefined }],
      ['"roles" is empty', { ...validBody, roles: [] }],
      ['"roles" is not a valid role', { ...validBody, roles: ["invalid"] }]
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

    it("should return 409 if jwt account no have a admin role", async () => {
      const viewerWorkspaceAccount = { ...mockWorkspaceAccount, roles: [IWorkspaceAccount.Role.Viewer] };
      jest.spyOn(mongoHelper, "collection")
        // get account by email
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockAccount]) }) }) } as any)
        // get workspace account by account
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([viewerWorkspaceAccount]) }) }) } as any)
        // get account
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([]) }) }) } as any)
        // get workspace
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockWorkspace]) }) }) } as any);

      const result = await supertest(app)
        .post(url)
        .set(mockAuthenticatedHeader)
        .send(validBody);

      expect(result.status).toBe(409);
    });

    it("should return 404 if account not exists", async () => {
      jest.spyOn(mongoHelper, "collection")
        // get account by email
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockAccount]) }) }) } as any)
        // get workspace account by account
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockWorkspaceAccount]) }) }) } as any)
        // get account
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([]) }) }) } as any)
        // get workspace
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockWorkspace]) }) }) } as any);

      const result = await supertest(app)
        .post(url)
        .set(mockAuthenticatedHeader)
        .send(validBody);

      expect(result.status).toBe(404);
    });

    it("should return 404 if account is removed", async () => {
      const removedAccount = { ...mockAccount, _removed: new Date() };
      jest.spyOn(mongoHelper, "collection")
        // get account by email
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockAccount]) }) }) } as any)
        // get workspace account by account
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockWorkspaceAccount]) }) }) } as any)
        // get account
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([removedAccount]) }) }) } as any)
        // get workspace
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockWorkspace]) }) }) } as any);

      const result = await supertest(app)
        .post(url)
        .set(mockAuthenticatedHeader)
        .send(validBody);

      expect(result.status).toBe(404);
    });

    it("should return 404 if workspace not exists", async () => {
      jest.spyOn(mongoHelper, "collection")
        // get account by email
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockAccount]) }) }) } as any)
        // get workspace account by account
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockWorkspaceAccount]) }) }) } as any)
        // get account
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockAccount]) }) }) } as any)
        // get workspace
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([]) }) }) } as any);

      const result = await supertest(app)
        .post(url)
        .set(mockAuthenticatedHeader)
        .send(validBody);

      expect(result.status).toBe(404);
    });

    it("should return 404 if workspace is removed", async () => {
      const removedWorkspace = { ...mockWorkspace, _removed: new Date() };
      jest.spyOn(mongoHelper, "collection")
        // get account by email
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockAccount]) }) }) } as any)
        // get workspace account by account
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockWorkspaceAccount]) }) }) } as any)
        // get account
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockAccount]) }) }) } as any)
        // get workspace
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([removedWorkspace]) }) }) } as any);

      const result = await supertest(app)
        .post(url)
        .set(mockAuthenticatedHeader)
        .send(validBody);

      expect(result.status).toBe(404);
    });

    it("should return 201 if add account to workspace", async () => {
      jest.spyOn(mongoHelper, "collection")
        // get account by email
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockAccount]) }) }) } as any)
        // get workspace account by account
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockWorkspaceAccount]) }) }) } as any)
        // get account
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockAccount]) }) }) } as any)
        // get workspace
        .mockReturnValueOnce({ find: np({ project: np({ toArray: np([mockWorkspace]) }) }) } as any)
        // add account to workspace
        .mockReturnValueOnce({ insertOne: np() } as any);

      const result = await supertest(app)
        .post(url)
        .set(mockAuthenticatedHeader)
        .send(validBody);

      expect(result.status).toBe(201);
    });
  });
});
