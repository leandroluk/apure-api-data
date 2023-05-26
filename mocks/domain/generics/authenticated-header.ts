import { IAuthenticatedHeader } from "$/domain/generics";
import { unexpirableEncryptedAccessToken } from "./bearer-authorization";

export const mockAuthenticatedHeader: IAuthenticatedHeader = {
  authorization: `Bearer ${unexpirableEncryptedAccessToken}`
};
