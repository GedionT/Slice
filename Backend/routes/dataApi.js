import express, { request } from 'express';
import DataController from '../app/Controllers/dataController';
import  uploadFile from '../app/Middleware/filereader';

const DataApiRouter = express.Router();

DataApiRouter.post('/exten/data/send/:uid',uploadFile.single('test'),(request, response) => {
  const dataController = new DataController(response);
  dataController.create(request);
});

DataApiRouter.post('/front/data/get/:uid', (request, response) => {
    const dataController = new DataController(response);
    dataController.fetch(request);
});

export default DataApiRouter;
