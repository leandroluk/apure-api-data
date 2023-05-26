import { IEntity } from "../generics";
import { IWorkspace } from "../models";

export type IAddWorkspace = {
  add (input: IAddWorkspace.Input): Promise<IWorkspace>;
};
export namespace IAddWorkspace {
  export type Input = Omit<IWorkspace, keyof IEntity>;
}
