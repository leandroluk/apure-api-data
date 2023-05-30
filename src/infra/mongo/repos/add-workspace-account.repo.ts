import { IAddWorkspaceAccountRepo } from "$/data/repos";
import { IWorkspaceAccount } from "$/domain/models";
import { mongoHelper } from "../mongo.helper";
import { workspaceAccountSchema } from "../schemas";

export class MongoAddWorkspaceAccountRepo implements IAddWorkspaceAccountRepo {
  async add (
    data: IAddWorkspaceAccountRepo.Data
  ): Promise<void> {
    await mongoHelper
      .collection<IWorkspaceAccount>(workspaceAccountSchema.collection)
      .insertOne(data.value, { session: mongoHelper.sessions[data.sessionId] });
  }
}
