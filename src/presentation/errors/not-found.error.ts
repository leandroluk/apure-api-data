export class NotFoundError extends Error {
  static defaultMessage = "Not Found";
  constructor (message?: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
