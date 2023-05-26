import { CheckJwtAdapter } from "$/infra/adapters/check-jwt.adapter";
import jsonwebtoken from "jsonwebtoken";

const makeSut = (): {
  sut: CheckJwtAdapter;
  jwt: string;
} => {
  const sut = new CheckJwtAdapter();
  const jwt = "jwt";
  return {
    sut,
    jwt
  };
};

describe("infra/adapters/check-jwt.adapter", () => {
  it("should return empty if jsonwebtoken.verify throws", async () => {
    const { sut, jwt } = makeSut();
    jest.spyOn(jsonwebtoken, "verify").mockImplementationOnce(throwFn);
    await expect(sut.check(jwt)).resolves.toBeUndefined();
  });

  it("should return decoded token", async () => {
    const { sut, jwt } = makeSut();
    jest.spyOn(jsonwebtoken, "verify").mockReturnValueOnce({
      type: "access",
      sub: "subject"
    } as any);
    await expect(sut.check(jwt)).resolves.toEqual({
      type: "access",
      email: "subject"
    });
  });
});
