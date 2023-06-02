import { ICheckJwtAdapter } from "$/data/adapters";

export class MockCheckJwtAdapter implements ICheckJwtAdapter {
  constructor (
    public $check: ICheckJwtAdapter.Result = {
      email: "email",
      type: "access"
    }
  ) { }

  async check (_jwt: ICheckJwtAdapter.Jwt): Promise<ICheckJwtAdapter.Result> {
    return this.$check;
  }
}
