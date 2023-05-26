import { IEntity } from "$/domain/generics";
import { mockUpdatable } from "./updatable";

export const mockEntity: IEntity = {
  ...mockUpdatable,
  _created: new Date(),
  _removed: null
};
