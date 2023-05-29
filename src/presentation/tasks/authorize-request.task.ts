import { IAccount } from "$/domain/models/account";

export type IAuthorizeRequestTask = {
  authorize (
    token: IAuthorizeRequestTask.Token
  ): Promise<IAuthorizeRequestTask.Result>;
};
export namespace IAuthorizeRequestTask {
  export type Token = string;
  export type Result = IAccount & {};
}
