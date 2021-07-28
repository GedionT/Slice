import Exception from './error';
/**
 * conflict request exception module
 */
export default class ConflictException extends Exception {
  constructor(message) {
    super();
    this.constructor = ConflictException;
    this.name = this.constructor.name;
    this.message = message || 'The request could not be completed due to a conflict with the current state of the target resource !';
  }
}
