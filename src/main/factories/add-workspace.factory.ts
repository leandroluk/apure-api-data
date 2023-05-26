import { AddWorkspaceTask, AuthorizeTask } from "$/data/tasks";
import { IAddWorkspaceCase } from "$/domain/cases";
import { CheckJwtAdapter, CreateUuidAdapter, DecrypterAdapter } from "$/infra/adapters";
import { MongoGetAccountByEmailRepo } from "$/infra/mongo";
import { MongoAddWorkspaceRepo } from "$/infra/mongo/repos/add-workspace.repo";
import { AddWorkspaceCase } from "$/presentation/cases";

let instance: IAddWorkspaceCase;

export const addWorkspaceFactory = (): IAddWorkspaceCase => {
  if (!instance) {
    const decrypterAdapter = new DecrypterAdapter();
    const checkJwtAdapter = new CheckJwtAdapter();
    const getAccountByEmailRepo = new MongoGetAccountByEmailRepo();
    const authorizeTask = new AuthorizeTask(
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
    instance = new AddWorkspaceCase(
      authorizeTask,
      addWorkspaceTask
    );
  }
  return instance;
};
