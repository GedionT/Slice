/**
 * validation exception module
 */
 import Exception from './error';

 export default class ValidationException extends Exception {
   constructor(message) {
     super();
     this.constructor = ValidationException;
     this.name = this.constructor.name;
     this.message = message || 'The syntax of the request entity is correct but was unable to process the contained instructions.';
   }
 }
 