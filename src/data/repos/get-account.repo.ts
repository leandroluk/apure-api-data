import { IAccount } from "$/domain/models";

export type IGetAccountRepo = {
  get (id: IGetAccountRepo.Id): Promise<IGetAccountRepo.Result>;
};
export namespace IGetAccountRepo {
  export type Id = IAccount["_id"];
  export type Result = IAccount & {};
}
