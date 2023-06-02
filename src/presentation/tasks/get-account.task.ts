import { IAccount } from "$/domain/models";

export type IGetAccountTask = {
  get (
    id: IGetAccountTask.Id
  ): Promise<IGetAccountTask.Result>;
};
export namespace IGetAccountTask {
  export type Id = IAccount["_id"];
  export type Result = IAccount & {};
}
