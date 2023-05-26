import { IBearerAuthorization } from "$/domain/generics";
import { IAccount } from "$/domain/models";

export type ICheckJwtAdapter = {
  check (jwt: string): Promise<ICheckJwtAdapter.Result>;
};
export namespace ICheckJwtAdapter {
  export type Result = Pick<IAccount, "email"> & {
    type: IBearerAuthorization.Type;
  };
}
