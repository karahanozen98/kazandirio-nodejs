export default class ValidationError extends Error {
  constructor() {
    super();
    this.message = "Parametre hatalı";
  }
}
