import express from 'express';
import DataController from '../app/Controllers/dataController';

const DataApiRouter = express.Router();

AccountApiRouter.post('/exten/data/send', (request, response) => {
  const dataController = new DataController(response);
  dataController.create(request);
});

AccountApiRouter.post('/front/data/get', (request, response) => {
    const dataController = new DataController(response);
    dataController.fetch(request);
});

export default DataApiRouter;
