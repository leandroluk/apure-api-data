import { IWorkspace } from "../models";

export type IDisableWorkspace = {
  disable (id: IWorkspace["_id"]): Promise<void>;
};
