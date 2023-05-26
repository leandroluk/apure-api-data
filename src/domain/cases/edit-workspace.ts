import { IEntity } from "../generics";
import { IWorkspace } from "../models";

export type IEditWorkspace = {
  edit (id: IWorkspace["_id"], changes: IEditWorkspace.Changes): Promise<IWorkspace>;
};
export namespace IEditWorkspace {
  export type Changes = Partial<Omit<IWorkspace, keyof IEntity>>;
}
