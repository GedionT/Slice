/**
 * not found exception module
 */
import Exception from './error';

export default class NotFoundException extends Exception {
  constructor(message) {
    super();
    this.constructor = NotFoundException;
    this.name = this.constructor.name;
    this.message = message || 'The origin server did not find a current representation for the target resource or is not willing to disclose that one exists !';
  }
}
