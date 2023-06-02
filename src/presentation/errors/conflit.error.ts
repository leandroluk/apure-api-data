export class ConflitError extends Error {
  static defaultMessage = "Conflit";
  constructor (message?: string) {
    super(message);
    this.name = "ConflitError";
  }
}
