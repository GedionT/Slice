const express  = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const dotenv = require('dotenv');
const PORT = process.env.PORT ||443;
const cors = require("cors");
app.use(cors());
dotenv.config();

app.get('/', (req, res) => {
    res.status(200).send('Working')
  })

    
io.on('connection', (socket) => {
  console.log('A user connected');
   
    socket.on('join-room', (roomId, userId ,userName) => {
      socket.join(roomId);
      socket.broadcast.to(roomId).emit('user-connected', userId );

    
      socket.on('message', (message) => {
        io.to(roomId).emit('createMessage', message , userName, userId);
      });
      
    });
  });
  
  server.listen( PORT , () => console.log(`Server listening to port ${PORT}`));