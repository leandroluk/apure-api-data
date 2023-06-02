import { IGetWorkspaceAccountByAccountRepo } from "$/data/repos";
import { IWorkspaceAccount } from "$/domain/models";
import { mongoHelper } from "../mongo.helper";
import { workspaceAccountSchema } from "../schemas";

export class MongoGetWorkspaceAccountByAccountRepo implements IGetWorkspaceAccountByAccountRepo {
  async get (data: IGetWorkspaceAccountByAccountRepo.Data): Promise<IGetWorkspaceAccountByAccountRepo.Result> {
    const [doc] = await mongoHelper
      .collection<IWorkspaceAccount>(workspaceAccountSchema.collection)
      .find({ account_id: data.account_id, workspace_id: data.workspace_id })
      .project<IGetWorkspaceAccountByAccountRepo.Result>(workspaceAccountSchema.projection)
      .toArray();

    return doc;
  }
}
