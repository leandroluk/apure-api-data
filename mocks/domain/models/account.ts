import { IAccount } from "$/domain/models";
import { mockEntity } from "../generics";

export const mockAccount: IAccount = {
  ...mockEntity,
  email: "mock.account@email.com",
  name: "name"
};
