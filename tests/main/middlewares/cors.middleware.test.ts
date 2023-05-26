import { app } from "$/main";
import supertest from "supertest";

describe("main/middlewares/cors.middleware", () => {
  const url = "/middlewares/cors";
  app.get(url, (_req, res) => res.sendStatus(200));

  describe(`GET ${url}`, () => {
    it("should return 200 with cors headers", async () => {
      const result = await supertest(app)
        .get(url);

      expect(result.status).toBe(200);
      expect(result.headers["access-control-allow-headers"]).toBe("*");
      expect(result.headers["access-control-allow-methods"]).toBe("*");
      expect(result.headers["access-control-allow-origin"]).toBe("*");
    });
  });

  describe(`OPTIONS ${url}`, () => {
    it("should return 204", async () => {
      const result = await supertest(app)
        .options(url);

      expect(result.status).toBe(204);
    });
  });
});
