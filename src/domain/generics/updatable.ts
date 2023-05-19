import { IIndexable } from "./indexable";

export type IUpdatable = IIndexable & {
  _timestamp: Date;
};
