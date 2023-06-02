import { IGetWorkspaceAccountByAccountTask } from "$/presentation/tasks";
import { IGetWorkspaceAccountByAccountRepo } from "../repos";

export class GetWorkspaceAccountByAccountTask implements IGetWorkspaceAccountByAccountTask {
  constructor (
    private readonly getWorkspaceAccountByAccount: IGetWorkspaceAccountByAccountRepo
  ) { }

  async get (data: IGetWorkspaceAccountByAccountTask.Data): Promise<IGetWorkspaceAccountByAccountTask.Result> {
    const result = await this.getWorkspaceAccountByAccount.get(data);
    return result;
  }
}
