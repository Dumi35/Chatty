const express = require('express');
const app = express();
const PORT = 4000;
const allMessages = []

//New imports
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  //console.log(`${socket.name} user just connected!`);

  //sends active users
  socket.on('newUser', (data) => {
    socketIO.emit('activeUsers', data);
    console.log("this is ",data)
  });

  //sends the message to all the users on the server
  socket.on('message', (data) => {
    allMessages.push(data)
    socketIO.emit('messageResponse', allMessages);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});


app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world lol',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});