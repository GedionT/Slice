import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Routes from './routes/routes';
import Error from './app/Exceptions/error';


require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
}); 

app.use('/api/users', Routes.AccountApiRouter); 

app.use((req, res, next) => {
  const error = new Error('Could not find this route.', 404);      
  throw error;
});

app.use((error, req, res, next) => {         
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!', success: error.success||false});
});

mongoose
  .connect(
    `mongodb+srv://${process.env.name}:${process.env.password}@cluster0.kzetf.mongodb.net/${process.env.db}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true }
    
  )
  .then(() => {
    console.log('listening at port',process.env.PORT || 5000 )
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => {
    console.log(err);
  });
  