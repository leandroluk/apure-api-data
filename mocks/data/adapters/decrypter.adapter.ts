import { IDecrypterAdapter } from "$/data/adapters";

export class MockDecrypterAdapter implements IDecrypterAdapter {
  constructor (
    public $decript = "decrypted"
  ) { }

  async decrypt (_hashed: IDecrypterAdapter.Hashed): Promise<IDecrypterAdapter.Result> {
    return this.$decript;
  }
}
