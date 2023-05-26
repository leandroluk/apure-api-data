import { IAddWorkspaceRepo } from "$/data/repos";
import { ObjectId } from "mongodb";
import { mongoHelper } from "../mongo.helper";
import { workspaceSchema } from "../schemas";

export class MongoAddWorkspaceRepo implements IAddWorkspaceRepo {
  async add (
    { _id, ...doc }: IAddWorkspaceRepo.Data
  ): Promise<void> {
    await mongoHelper
      .collection(workspaceSchema.collection)
      .insertOne({ _id: _id as unknown as ObjectId, ...doc });
  }
}
