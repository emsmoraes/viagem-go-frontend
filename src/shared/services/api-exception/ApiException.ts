export class ApiException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiException";
  }
}
