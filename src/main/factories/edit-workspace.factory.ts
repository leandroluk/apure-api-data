import { AuthorizeRequestTask, EditWorkspaceTask } from "$/data/tasks";
import { IEditWorkspaceCase } from "$/domain/cases";
import { CheckJwtAdapter, DecrypterAdapter } from "$/infra/adapters";
import { MongoEditWorkspaceRepo, MongoGetAccountByEmailRepo, MongoGetWorkspaceRepo } from "$/infra/mongo";
import { EditWorkspaceCase } from "$/presentation/cases";

let instance: IEditWorkspaceCase;

export const editWorkspaceFactory = (): IEditWorkspaceCase => {
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
    const editWorkspaceTask = new EditWorkspaceTask(
      getWorkspaceRepo,
      editWorkspaceRepo
    );
    instance = new EditWorkspaceCase(
      authorizeRequestTask,
      editWorkspaceTask
    );
  }
  return instance;
};
