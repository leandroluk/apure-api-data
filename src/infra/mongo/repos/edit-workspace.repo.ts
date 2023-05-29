import { IEditWorkspaceRepo } from "$/data/repos";
import { IWorkspace } from "$/domain/models";
import { mongoHelper } from "../mongo.helper";
import { workspaceSchema } from "../schemas";

export class MongoEditWorkspaceRepo implements IEditWorkspaceRepo {
  async edit (
    id: IEditWorkspaceRepo.Id,
    changes: IEditWorkspaceRepo.Changes
  ): Promise<void> {
    await mongoHelper
      .collection<IWorkspace>(workspaceSchema.collection)
      .findOneAndUpdate({ _id: id }, { $set: changes });
  }
}
