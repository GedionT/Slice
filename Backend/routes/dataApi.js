import express from 'express';
import AccountController from '../app/Controllers/accountController';

const DataApiRouter = express.Router();

AccountApiRouter.post('/exten/data/send', (request, response) => {
  const accountController = new AccountController(response);
  accountController.addAccount(request);
});

AccountApiRouter.post('/front/data/get', (request, response) => {
    const accountController = new AccountController(response);
    accountController.addAccount(request);
});

export default DataApiRouter;
