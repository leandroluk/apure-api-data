export type IDecrypterAdapter = {
  decrypt (hashed: IDecrypterAdapter.Hashed): Promise<IDecrypterAdapter.Result>;
};
export namespace IDecrypterAdapter {
  export type Hashed = string;
  export type Result = string;
}
