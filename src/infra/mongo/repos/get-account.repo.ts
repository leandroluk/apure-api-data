import { IGetAccountRepo } from "$/data/repos";
import { IWorkspace } from "$/domain/models";
import { mongoHelper } from "../mongo.helper";
import { accountSchema } from "../schemas";

export class MongoGetAccountRepo implements IGetAccountRepo {
  async get (id: IGetAccountRepo.Id): Promise<IGetAccountRepo.Result> {
    const [doc] = await mongoHelper
      .collection<IWorkspace>(accountSchema.collection)
      .find({ _id: id })
      .project<IGetAccountRepo.Result>(accountSchema.projection)
      .toArray();

    return doc;
  }
}
