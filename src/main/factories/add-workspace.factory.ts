import { AddWorkspaceAccountTask, AddWorkspaceTask, AuthorizeRequestTask } from "$/data/tasks";
import { IAddWorkspaceCase } from "$/domain/cases";
import { CheckJwtAdapter, CreateUuidAdapter, DecrypterAdapter } from "$/infra/adapters";
import { MongoAddWorkspaceAccountRepo, MongoAddWorkspaceRepo, MongoGetAccountByEmailRepo } from "$/infra/mongo";
import { AddWorkspaceCase } from "$/presentation/cases";

let instance: IAddWorkspaceCase;

export const addWorkspaceFactory = (): IAddWorkspaceCase => {
  if (!instance) {
    const decrypterAdapter = new DecrypterAdapter();
    const checkJwtAdapter = new CheckJwtAdapter();
    const getAccountByEmailRepo = new MongoGetAccountByEmailRepo();
    const authorizeRequestTask = new AuthorizeRequestTask(
      decrypterAdapter,
      checkJwtAdapter,
      getAccountByEmailRepo
    );
    const createUuid = new CreateUuidAdapter();
    const addWorkspace = new MongoAddWorkspaceRepo();
    const addWorkspaceTask = new AddWorkspaceTask(
      createUuid,
      addWorkspace
    );
    const addWorkspaceAccountRepo = new MongoAddWorkspaceAccountRepo();
    const addWorkspaceAccountTask = new AddWorkspaceAccountTask(
      createUuid,
      addWorkspaceAccountRepo
    );
    instance = new AddWorkspaceCase(
      authorizeRequestTask,
      addWorkspaceTask,
      addWorkspaceAccountTask
    );
  }
  return instance;
};
