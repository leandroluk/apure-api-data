import { IDecrypterAdapter } from "$/data/adapters";
import crypto from "crypto";

export class DecrypterAdapter implements IDecrypterAdapter {
  async decrypt (
    hashed: string
  ): Promise<string> {
    try {
      const [iv, key, encrypted] = hashed.split(".");
      const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
      const decrypted = decipher.update(encrypted, "base64url", "utf8") + decipher.final("utf8");
      return decrypted;
    } catch { }
  }
}
