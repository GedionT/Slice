import express from 'express';
import AccountController from '../app/Controllers/accountController';

const AccountApiRouter = express.Router();


//Routes to signup data
AccountApiRouter.post('/account/signup', (request, response) => {       
  const accountController = new AccountController(response);
  accountController.addAccount(request);
});

//Edit account details(Here goals only)
AccountApiRouter.post('/account/:uid/:type', (request, response) => {
  const accountController = new AccountController(response);
  accountController.getInfo(request);
});

//Routes to get account details
AccountApiRouter.post('/account/:uid/info', (request, response) => {
  const accountController = new AccountController(response);
  accountController.getInfo(request);
});


export default AccountApiRouter;
