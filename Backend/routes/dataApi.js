import express, { request } from 'express';
import DataController from '../app/Controllers/dataController';
import  uploadFile from '../app/Middleware/filereader';

const DataApiRouter = express.Router();

//Rouets for extension to send the data
DataApiRouter.post('/exten/data/send/:uid',uploadFile.single('data-patch'),(request, response) => {
  const dataController = new DataController(response);
  dataController.create(request);
});


//Routes for frontend to access the data
DataApiRouter.post('/front/data/get/:uid/:type/:context', (request, response) => {
  const dataController = new DataController(response);
  dataController.fetch(request);
});


//Routes for frontend to access the language
DataApiRouter.post('/front/data/get/:uid/:type', (request, response) => {
  const dataController = new DataController(response);
  dataController.fetchdata(request);
});


DataApiRouter.post('/front/data/reply/:uid/send', (request, response) => {
  const dataController = new DataController(response);
  dataController.send(request);
});

export default DataApiRouter;
