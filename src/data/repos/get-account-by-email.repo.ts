import { IAccount } from "$/domain/models";

export type IGetAccountByEmailRepo = {
  get (
    email: IGetAccountByEmailRepo.Email
  ): Promise<IGetAccountByEmailRepo.Result>;
};
export namespace IGetAccountByEmailRepo {
  export type Email = IAccount["email"];
  export type Result = IAccount & {};
}
