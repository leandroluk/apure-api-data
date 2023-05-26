import { DecrypterAdapter } from "$/infra/adapters/decrypter.adapter";
import crypto from "crypto";

const makeSut = (): {
  sut: DecrypterAdapter;
  hashed: string;
} => {
  const sut = new DecrypterAdapter();
  const hashed = "iv.key.plain";
  return {
    sut,
    hashed
  };
};

describe("infra/adapters/decrypter.adapter", () => {
  it("should return decrypted value", async () => {
    const { sut, hashed } = makeSut();
    jest.spyOn(crypto, "createDecipheriv")
      .mockReturnValueOnce({ update: np(""), final: np("plain") } as any);
    await expect(sut.decrypt(hashed)).resolves.toBe("plain");
  });
});
