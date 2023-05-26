import { ICheckJwtAdapter } from "$/data/adapters";

export class MockCheckJwtAdapter implements ICheckJwtAdapter {
  constructor (
    public $check: ICheckJwtAdapter.Result = {
      email: "email",
      type: "access"
    }
  ) { }

  async check (
    _jwt: string
  ): Promise<ICheckJwtAdapter.Result> {
    return this.$check;
  }
}
