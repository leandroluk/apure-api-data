import { IGetWorkspaceRepo } from "$/data/repos";
import { IWorkspace } from "$/domain/models";
import { mongoHelper } from "../mongo.helper";
import { workspaceSchema } from "../schemas";

export class MongoGetWorkspaceRepo implements IGetWorkspaceRepo {
  async get (id: string): Promise<IGetWorkspaceRepo.Result> {
    const [doc] = await mongoHelper
      .collection<IWorkspace>(workspaceSchema.collection)
      .find({ _id: id, _removed: null })
      .project<IGetWorkspaceRepo.Result>(workspaceSchema.projection)
      .toArray();

    return doc;
  }
}
