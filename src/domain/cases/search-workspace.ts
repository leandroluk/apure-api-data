import { ISearch } from "../generics";
import { IWorkspace } from "../models";

export type ISearchWorkspace = {
  search (query: ISearch.Query<IWorkspace>): Promise<ISearch.Result<IWorkspace>>;
};
