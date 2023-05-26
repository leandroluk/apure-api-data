import { IEntity } from "../generics";

export type IWorkspaceProduct = IEntity & {
  group: string;
  description: string;
  code: string;
  ean: string;
  ncm?: string;
  unit?: string;
};
