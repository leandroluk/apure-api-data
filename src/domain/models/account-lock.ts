import { IEntity } from "../generics";
import { IAccount } from "./account";

export type IAccountLock = IEntity & {
  account_id: IAccount["_id"];
  expires: Date;
  type: "confirm" | "recover";
  code: string;
};
