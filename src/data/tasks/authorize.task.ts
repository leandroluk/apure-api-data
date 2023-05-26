import { IAuthorizeTask } from "$/presentation/tasks";
import { ICheckJwtAdapter, IDecrypterAdapter } from "../adapters";
import { IGetAccountByEmailRepo } from "../repos";

export class AuthorizeTask implements IAuthorizeTask {
  constructor (
    private readonly decrypter: IDecrypterAdapter,
    private readonly checkJwt: ICheckJwtAdapter,
    private readonly getAccountByEmail: IGetAccountByEmailRepo
  ) { }

  async authorize (token: IAuthorizeTask.Token): Promise<IAuthorizeTask.Result> {
    const jwt = await this.decrypter.decrypt(token);
    if (jwt) {
      const checked = await this.checkJwt.check(jwt);
      if (checked) {
        const account = await this.getAccountByEmail.get(checked.email);
        return account;
      }
    }
  }
}
