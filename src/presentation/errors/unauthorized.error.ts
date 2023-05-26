export class UnauthorizedError extends Error {
  static readonly defaultMessage = "Unauthorized access";
  constructor (message = UnauthorizedError.defaultMessage) {
    super(message);
    this.name = "UnauthorizedError";
  }
}
