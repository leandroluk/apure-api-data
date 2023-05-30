import { IIndexable } from "$/domain/generics";
import { IWorkspace } from "$/domain/models";

export type IEditWorkspaceRepo = {
  edit (
    data: IEditWorkspaceRepo.Data,
  ): Promise<void>;
};
export namespace IEditWorkspaceRepo {
  export type Data = {
    id: IWorkspace["_id"];
    changes: Partial<Omit<IWorkspace, keyof IIndexable>>;
    sessionId?: string;
  };
}
