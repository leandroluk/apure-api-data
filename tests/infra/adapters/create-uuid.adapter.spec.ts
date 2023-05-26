import { CreateUuidAdapter } from "$/infra/adapters/create-uuid.adapter";
import crypto from "crypto";

const makeSut = (): {
  sut: CreateUuidAdapter;
} => {
  const sut = new CreateUuidAdapter();
  return {
    sut
  };
};

describe("tests/infra/adapters/create-uuid.adapter.ts", () => {
  it("should return created uuid", async () => {
    const { sut } = makeSut();
    jest.spyOn(crypto, "randomUUID")
      .mockReturnValueOnce("uuid" as any);
    await expect(sut.create()).resolves.toBe("uuid");
  });
});
