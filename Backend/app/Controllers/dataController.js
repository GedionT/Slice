import Controller from './controller';
import * as Exceptions from '../Exceptions/exceptions'
import Validators from '../Validators/validators';
import DataService from '../Services/dataSource';
export default class DataController extends Controller {
    constructor(response) {
      super(response);
      this.service = new DataService();
    }

    create (request) {
        try{
            
            this.service.create(request.file)
            this.sendResponse(request.test)
        } catch (error) {
            this.handleException(error)
        }
    }

    fetch (request) {
      try{
        const type =  request.params.type;
        const uid =  request.params.uid;
        const promise  = this.service.fetch(type,uid);
        promise.then(res=>{
          this.sendResponse(res);
        }).catch(error =>{
          this.handleException(error);
        })
      } catch (error) {
          this.handleException(error)
      }
  }
}