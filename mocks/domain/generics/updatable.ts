import { IUpdatable } from "$/domain/generics";
import { mockIndexable } from "./indexable";

export const mockUpdatable: IUpdatable = {
  ...mockIndexable,
  _timestamp: new Date()
};
