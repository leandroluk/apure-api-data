import { IEntity } from "../generics";

export type IAccount = IEntity & {
  name: string;
  email: string;
  password: string;
};
