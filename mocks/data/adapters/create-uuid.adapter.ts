import { ICreateUuidAdapter } from "$/data/adapters";

export class MockCreateUuidAdapter implements ICreateUuidAdapter {
  constructor (
    public $create = "uuid"
  ) { }

  async create (): Promise<string> {
    return this.$create;
  }
}
