import { app } from "$/main";
import { errorHandlerMiddleware } from "$/main/middlewares";
import { vars } from "$/vars";
import { Request, Response } from "express";
import supertest from "supertest";

describe("main/middlewares/error-handler.middleware", () => {
  const url = "/middlewares/error-handler";
  app.post(url, (req: Request, _res: Response) => {
    const error: any = new Error();
    error.name = req.body.name;
    error._original = {};
    error.details = {};
    throw error;
  }, errorHandlerMiddleware);

  describe("GET /middlewares/error-handler", () => {
    it.each([
      [400, "ValidationError"],
      [401, "UnauthorizedError"],
      [500, "UnknownError"]
    ])("should return %p when throw %p", async (status, name) => {
      const result = await supertest(app)
        .post(url)
        .send({ name });
      expect(result.status).toBe(status);
    });

    it("should no remove extra properties of ValidationError in production mode", async () => {
      const body = { name: "ValidationError" };

      vars.env = "production";

      const prd = await supertest(app).post(url).send(body);
      expect(prd.body._original).not.toBeDefined();
      expect(prd.body.details).not.toBeDefined();

      vars.env = "development";

      const dev = await supertest(app).post(url).send(body);
      expect(dev.body._original).toBeDefined();
      expect(dev.body.details).toBeDefined();
    });
  });
});
