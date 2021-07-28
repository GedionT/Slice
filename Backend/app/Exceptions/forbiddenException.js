/**
 * lacks permission to access resource exception module
 */
import Exception from './error';

export default class ForbiddenException extends Exception {
  constructor(message) {
    super();
    this.constructor = ForbiddenException;
    this.name = this.constructor.name;
    this.message = message || "The request has not been applied because you don't have the necessary permissions for this resource !";
  }
}
