import { IUpdatable } from "./updatable";

export type IEntity = IUpdatable & {
  _created: Date;
  _removed?: Date;
};
