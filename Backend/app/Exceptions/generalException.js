/**
 * general request exception module
 */
import Exception from './error';

export default class GeneralException extends Exception {
  constructor(message) {
    super();
    this.constructor = GeneralException;
    this.name = this.constructor.name;
    this.message = (message) || 'The server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay !';
  }
}
