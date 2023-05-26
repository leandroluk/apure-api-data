import { IAccount } from "$/domain/models/account";

export type IAuthorizeTask = {
  authorize (token: IAuthorizeTask.Token): Promise<IAuthorizeTask.Result>;
};
export namespace IAuthorizeTask {
  export type Token = string;
  export type Result = IAccount & {};
}
