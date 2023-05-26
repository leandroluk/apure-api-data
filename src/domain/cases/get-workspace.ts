import { IWorkspace } from "../models";

export type IGetWorkspace = {
  get (id: IWorkspace["_id"]): Promise<IWorkspace>;
};
