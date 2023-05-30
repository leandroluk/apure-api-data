import { mongoHelper } from "$/infra/mongo";
import { NextFunction, Request, RequestHandler, Response } from "express";

export const mongoTransactionWrapper = (handler: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const sid = await mongoHelper.startSession();
    req.headers.sid = sid;
    return Promise
      /* eslint-disable-next-line @typescript-eslint/no-confusing-void-expression */
      .resolve(handler(req, res, next))
      .then(async () => { await mongoHelper.endSession(sid); })
      .catch(async err => { await mongoHelper.endSession(sid, err).then(() => { next(err); }); });
  };
};
