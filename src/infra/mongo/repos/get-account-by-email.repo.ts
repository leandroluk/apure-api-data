import { IGetAccountByEmailRepo } from "$/data/repos";
import { mongoHelper } from "../mongo.helper";
import { accountSchema } from "../schemas";

export class MongoGetAccountByEmailRepo implements IGetAccountByEmailRepo {
  async get (
    email: IGetAccountByEmailRepo.Email
  ): Promise<IGetAccountByEmailRepo.Result> {
    const [doc] = await mongoHelper
      .collection(accountSchema.collection)
      .find({ email, _removed: null })
      .project<IGetAccountByEmailRepo.Result>(accountSchema.projection)
      .toArray();

    return doc;
  }
}
