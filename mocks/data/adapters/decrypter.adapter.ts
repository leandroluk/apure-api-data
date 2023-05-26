import { IDecrypterAdapter } from "$/data/adapters";

export class MockDecrypterAdapter implements IDecrypterAdapter {
  constructor (
    public $decript = "decrypted"
  ) { }

  async decrypt (
    _hashed: string
  ): Promise<string> {
    return this.$decript;
  }
}
