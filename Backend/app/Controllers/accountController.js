import Controller from './controller';
import * as Exceptions from '../Exceptions/exceptions'
import Validators from '../Validators/validators';
import AccountService from '../Services/accountService';
export default class AccountController extends Controller {
    constructor(response) {
      super(response);
      this.service = new AccountService();
    }

    addAccount (request) {
        try{
            let {value,error} = Validators.createAccount.validate(request.body);
            if(error){
                throw (new Exceptions.ValidationException(error.details[0].message));
            }     
            const addUser = this.service.addAccount(value);
            addUser.then(res => {
                this.sendResponse(res);
              })
              .catch (error => {
                this.handleException(error);
              }) 
        } catch (error) {
            this.handleException(error)
        }
    }

    loginAccount (request) {
      try{
          let {value,error} = Validators.loginAccount.validate(request.body);
          if(error){
              throw (new Exceptions.ValidationException(error.details[0].message));
          }     
          const addUser = this.service.loginAccount(value);
          addUser.then(res => {
              this.sendResponse(res);
            })
            .catch (error => {
              this.handleException(error);
            }) 
      } catch (error) {
          this.handleException(error)
      }
  }


    getInfo (request) {
      try {
        let value = {_id:request.params.uid};
        const userInfo = this.service.verifyUserDetail(value,request.body,request.params.type);
        userInfo.then(res=>{
          this.sendResponse(res);
        })
        .catch(error => {this.handleException(error)});
      } catch (error){
        this.handleException(error);
      }
    }
}