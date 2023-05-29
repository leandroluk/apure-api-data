import { AuthorizeRequestTask, DisableWorkspaceTask } from "$/data/tasks";
import { IDisableWorkspaceCase } from "$/domain/cases";
import { CheckJwtAdapter, DecrypterAdapter } from "$/infra/adapters";
import { MongoEditWorkspaceRepo, MongoGetAccountByEmailRepo, MongoGetWorkspaceRepo } from "$/infra/mongo";
import { DisableWorkspaceCase } from "$/presentation/cases";

let instance: IDisableWorkspaceCase;

export const disableWorkspaceFactory = (): IDisableWorkspaceCase => {
  if (!instance) {
    const decrypterAdapter = new DecrypterAdapter();
    const checkJwtAdapter = new CheckJwtAdapter();
    const getAccountByEmailRepo = new MongoGetAccountByEmailRepo();
    const authorizeRequestTask = new AuthorizeRequestTask(
      decrypterAdapter,
      checkJwtAdapter,
      getAccountByEmailRepo
    );
    const getWorkspaceRepo = new MongoGetWorkspaceRepo();
    const editWorkspaceRepo = new MongoEditWorkspaceRepo();
    const disableWorkspaceTask = new DisableWorkspaceTask(
      getWorkspaceRepo,
      editWorkspaceRepo
    );
    instance = new DisableWorkspaceCase(
      authorizeRequestTask,
      disableWorkspaceTask
    );
  }
  return instance;
};
