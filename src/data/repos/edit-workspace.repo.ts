import { IIndexable } from "$/domain/generics";
import { IWorkspace } from "$/domain/models";

export type IEditWorkspaceRepo = {
  edit (
    id: IEditWorkspaceRepo.Id,
    changes: IEditWorkspaceRepo.Changes
  ): Promise<void>;
};
export namespace IEditWorkspaceRepo {
  export type Id = IWorkspace["_id"];
  export type Changes = Partial<Omit<IWorkspace, keyof IIndexable>> & {};
}
