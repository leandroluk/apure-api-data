export type IDecrypterAdapter = {
  decrypt (
    hashed: string
  ): Promise<string>;
};
