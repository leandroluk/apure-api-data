import { IWorkspace } from "../models";

export type IEnableWorkspace = {
  enable (id: IWorkspace["_id"]): Promise<IWorkspace>;
};
