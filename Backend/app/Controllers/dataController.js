import Controller from './controller';
import * as Exceptions from '../Exceptions/exceptions'
import Validators from '../Validators/validators';
import DataSource from '../Services/dataSource';
export default class DataController extends Controller {
    constructor(response) {
      super(response);
      this.service = new DataSource();
    }

    create (request) {
        try{
            
        } catch (error) {
            this.handleException(error)
        }
    }

    fetch (request) {
      try{
         
      } catch (error) {
          this.handleException(error)
      }
  }
}