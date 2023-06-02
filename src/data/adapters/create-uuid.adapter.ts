export type ICreateUuidAdapter = {
  create (): Promise<ICreateUuidAdapter.Result>;
};
export namespace ICreateUuidAdapter {
  export type Result = string;
}
