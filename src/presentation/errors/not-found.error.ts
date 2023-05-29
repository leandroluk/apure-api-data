export class NotFoundError extends Error {
  static defaultMessage = "Not Found";
  constructor (message = NotFoundError.defaultMessage) {
    super(message);
    this.name = "NotFoundError";
  }
}
