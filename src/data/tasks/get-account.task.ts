import { IGetAccountTask } from "$/presentation/tasks";
import { IGetAccountRepo } from "../repos";

export class GetAccountTask implements IGetAccountTask {
  constructor (
    private readonly getAccount: IGetAccountRepo
  ) { }

  async get (id: IGetAccountTask.Id): Promise<IGetAccountTask.Result> {
    const account = await this.getAccount.get(id);
    return account;
  }
}
