import { ICreateUuidAdapter } from "$/data/adapters";
import crypto from "crypto";

export class CreateUuidAdapter implements ICreateUuidAdapter {
  async create (): Promise<string> {
    const result = crypto.randomUUID();
    return result;
  }
}
