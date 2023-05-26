import { app } from "$/main";
import { errorHandlerMiddleware } from "$/main/middlewares";
import { Request, Response } from "express";
import supertest from "supertest";

describe("main/middlewares/error-handler.middleware", () => {
  const url = "/middlewares/error-handler";
  app.post(url, (req: Request, _res: Response) => {
    const error = new Error();
    error.name = req.body.name;
    throw error;
  }, errorHandlerMiddleware);

  describe(`GET ${url}`, () => {
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
  });
});
