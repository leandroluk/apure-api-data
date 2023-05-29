import { IWorkspace } from "$/domain/models";
import { mockEntity } from "../generics";

export const mockWorkspace: IWorkspace = {
  ...mockEntity,
  name: "name",
  ownerCnpj: "75748633000181"
};
