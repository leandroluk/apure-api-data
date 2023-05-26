import { mongoHelper } from "$/infra/mongo";
import { app } from "$/main";
import supertest from "supertest";

describe("main/routes/index", () => {
  describe("GET /docs/swagger.json", () => {
    const url = "/docs/swagger.json";

    it("should return 200 with swagger.json", async () => {
      const result = await supertest(app)
        .get(url);

      expect(result.status).toBe(200);
    });
  });

  describe("GET /docs", () => {
    const url = "/docs";

    it("should return 200 if swagger is enabled", async () => {
      const result = await supertest(app)
        .get(url);

      expect(result.status < 400).toBeTruthy();
    });
  });

  describe("GET /health", () => {
    const url = "/health";

    it("should return 500 if can't connect to db", async () => {
      mongoHelper.client = { db: np({ stats: throwFn }) } as any;

      const result = await supertest(app)
        .get(url);
      expect(result.status).toBe(500);
    });

    it("should return 200 if can connect to db", async () => {
      mongoHelper.client = { db: np({ stats: np }) } as any;

      const result = await supertest(app)
        .get(url);
      expect(result.status).toBe(200);
    });
  });
});
