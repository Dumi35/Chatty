const express = require('express');
const app = express();
const PORT = 4000;
const allMessages = []
const allActiveUsers = []

//New imports
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

//io is for everyone on the page
//socket is for each individual client whiich explains why each person had only messages from when they came show up

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
    console.log("sad noises",data)
    allActiveUsers.push(data)
    console.log("all the users", allActiveUsers)
    socketIO.emit('activeUsers', allActiveUsers);
    socketIO.emit('messageResponse', allMessages);
  });
 

  socket.on('message', (data) => {
    allMessages.push(data)
    socketIO.emit('messageResponse', allMessages);
  });
  
  socketIO.emit('activeUsers', allActiveUsers);
  socketIO.emit('messageResponse', allMessages);
 /*  socket.on('deletedUser', (data) => {
    
    allActiveUsers.filter(item => item.id !== data);
    socketIO.emit('activeUsers', allActiveUsers);
    
  }); */
  

  //sends the message to all the users on the server
  
  
  //socketIO.emit('messageResponse', allMessages);

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