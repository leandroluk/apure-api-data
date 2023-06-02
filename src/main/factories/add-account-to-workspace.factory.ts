import {
  AddWorkspaceAccountTask,
  AuthorizeRequestTask,
  GetAccountTask,
  GetWorkspaceAccountByAccountTask,
  GetWorkspaceTask
} from "$/data/tasks";
import { IAddAccountToWorkspaceCase } from "$/domain/cases";
import { CheckJwtAdapter, CreateUuidAdapter, DecrypterAdapter } from "$/infra/adapters";
import {
  MongoAddWorkspaceAccountRepo,
  MongoGetAccountByEmailRepo,
  MongoGetAccountRepo,
  MongoGetWorkspaceAccountByAccountRepo,
  MongoGetWorkspaceRepo
} from "$/infra/mongo";
import { AddAccountToWorkspaceCase } from "$/presentation/cases";

let instance: IAddAccountToWorkspaceCase;

export const addAccountToWorkspaceFactory = (): IAddAccountToWorkspaceCase => {
  if (!instance) {
    const decrypterAdapter = new DecrypterAdapter();
    const checkJwtAdapter = new CheckJwtAdapter();
    const getAccountByEmailRepo = new MongoGetAccountByEmailRepo();
    const authorizeRequestTask = new AuthorizeRequestTask(
      decrypterAdapter,
      checkJwtAdapter,
      getAccountByEmailRepo
    );
    const getAccountRepo = new MongoGetAccountRepo();
    const getAccountTask = new GetAccountTask(
      getAccountRepo
    );
    const getWorkspaceRepo = new MongoGetWorkspaceRepo();
    const getWorkspaceTask = new GetWorkspaceTask(
      getWorkspaceRepo
    );
    const getWorkspaceAccountByAccountRepo = new MongoGetWorkspaceAccountByAccountRepo();
    const getWorkspaceAccountByAccountTask = new GetWorkspaceAccountByAccountTask(
      getWorkspaceAccountByAccountRepo
    );
    const createUuidAdapter = new CreateUuidAdapter();
    const addWorkspaceAccountRepo = new MongoAddWorkspaceAccountRepo();
    const addWorkspaceAccountTask = new AddWorkspaceAccountTask(
      createUuidAdapter,
      addWorkspaceAccountRepo
    );
    instance = new AddAccountToWorkspaceCase(
      authorizeRequestTask,
      getAccountTask,
      getWorkspaceTask,
      getWorkspaceAccountByAccountTask,
      addWorkspaceAccountTask
    );
  }
  return instance;
};
