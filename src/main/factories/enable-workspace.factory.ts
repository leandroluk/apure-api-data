import { AuthorizeRequestTask, EnableWorkspaceTask } from "$/data/tasks";
import { IEnableWorkspaceCase } from "$/domain/cases";
import { CheckJwtAdapter, DecrypterAdapter } from "$/infra/adapters";
import { MongoEditWorkspaceRepo, MongoGetAccountByEmailRepo, MongoGetWorkspaceRepo } from "$/infra/mongo";
import { EnableWorkspaceCase } from "$/presentation/cases";

let instance: IEnableWorkspaceCase;

export const enableWorkspaceFactory = (): IEnableWorkspaceCase => {
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
    const enableWorkspaceTask = new EnableWorkspaceTask(
      getWorkspaceRepo,
      editWorkspaceRepo
    );
    instance = new EnableWorkspaceCase(
      authorizeRequestTask,
      enableWorkspaceTask
    );
  }
  return instance;
};
