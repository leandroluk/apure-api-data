import { IEditWorkspaceRepo } from "$/data/repos";
import { IWorkspace } from "$/domain/models";
import { mongoHelper } from "../mongo.helper";
import { workspaceSchema } from "../schemas";

export class MongoEditWorkspaceRepo implements IEditWorkspaceRepo {
  async edit (
    data: IEditWorkspaceRepo.Data
  ): Promise<void> {
    await mongoHelper
      .collection<IWorkspace>(workspaceSchema.collection)
      .findOneAndUpdate(
        { _id: data.id },
        { $set: data.changes },
        { session: mongoHelper.sessions[data.sessionId] }
      );
  }
}
