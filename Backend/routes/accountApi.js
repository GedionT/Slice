import express from 'express';
import AccountController from '../app/Controllers/accountController';

const AccountApiRouter = express.Router();

AccountApiRouter.post('/account/signup', (request, response) => {
  const accountController = new AccountController(response);
  accountController.addAccount(request);
});

AccountApiRouter.post('/account/:uid/:type', (request, response) => {
  const accountController = new AccountController(response);
  accountController.getInfo(request);
});

AccountApiRouter.post('/account/:uid/info', (request, response) => {
  const accountController = new AccountController(response);
  accountController.getInfo(request);
});


export default AccountApiRouter;
