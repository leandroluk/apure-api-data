import { IBearerAuthorization } from "$/domain/generics";
import { IAccount } from "$/domain/models";

export type ICheckJwtAdapter = {
  check (jwt: ICheckJwtAdapter.Jwt): Promise<ICheckJwtAdapter.Result>;
};
export namespace ICheckJwtAdapter {
  export type Jwt = string;
  export type Result = Pick<IAccount, "email"> & {
    type: IBearerAuthorization.Type;
  };
}
