import { ICheckJwtAdapter } from "$/data/adapters";
import { vars } from "$/vars";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

export class CheckJwtAdapter implements ICheckJwtAdapter {
  async check (jwt: ICheckJwtAdapter.Jwt): Promise<ICheckJwtAdapter.Result> {
    try {
      const result = jsonwebtoken.verify(jwt, vars.jwt.secret) as JwtPayload;
      return {
        type: result.type,
        email: result.sub
      };
    } catch { }
  }
}
