import { IAddWorkspaceRepo } from "$/data/repos";
import { IWorkspace } from "$/domain/models";
import { mongoHelper } from "../mongo.helper";
import { workspaceSchema } from "../schemas";

export class MongoAddWorkspaceRepo implements IAddWorkspaceRepo {
  async add (
    data: IAddWorkspaceRepo.Data
  ): Promise<void> {
    await mongoHelper
      .collection<IWorkspace>(workspaceSchema.collection)
      .insertOne(data);
  }
}
