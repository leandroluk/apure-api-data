import { IAuthorizeRequestTask } from "$/presentation/tasks";
import { ICheckJwtAdapter, IDecrypterAdapter } from "../adapters";
import { IGetAccountByEmailRepo } from "../repos";

export class AuthorizeRequestTask implements IAuthorizeRequestTask {
  constructor (
    private readonly decrypter: IDecrypterAdapter,
    private readonly checkJwt: ICheckJwtAdapter,
    private readonly getAccountByEmail: IGetAccountByEmailRepo
  ) { }

  async authorize (
    token: IAuthorizeRequestTask.Token
  ): Promise<IAuthorizeRequestTask.Result> {
    const jwt = await this.decrypter.decrypt(token.split(" ").at(-1));
    if (jwt) {
      const checked = await this.checkJwt.check(jwt);
      if (checked?.type === "access") {
        const account = await this.getAccountByEmail.get(checked.email);
        if (account && !account._removed) {
          return account;
        }
      }
    }
  }
}
