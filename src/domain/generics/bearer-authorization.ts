export type IBearerAuthorization = {
  type: "Bearer";
  access: {
    token: string;
    expires: number;
  };
  refresh: {
    token: string;
    expires: number;
  };
};
export namespace IBearerAuthorization {
  export type Type = "access" | "refresh";
}
