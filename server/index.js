const express = require('express');
const app = express();
const PORT = 4000;
const allMessages = []
var allActiveUsers = []

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


socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  //sends active users and past messages to new user that joins whether through reload or new connect
  socket.on('newUser', (data) => {
    allActiveUsers.push(data)
    //console.log("all the users", allActiveUsers)
    socketIO.emit('activeUsers', allActiveUsers);
    socketIO.emit('messageResponse', allMessages);
  });
 
  //for footer event
  socket.on('message', (data) => {
    allMessages.push(data)
    socketIO.emit('messageResponse', allMessages);
  });


  //sends all active users
  socketIO.emit('activeUsers', allActiveUsers);

  //sends the message to all the users on the server
  socketIO.emit('messageResponse', allMessages);

  //send user currently typing
  socket.on('isTyping',(data)=>{
    socketIO.emit('userTyping', [data]);
  })

 socket.on('deletedUser', (data) => {
    allActiveUsers=allActiveUsers.filter(item => item.userName !== data.userName);
    socketIO.emit('activeUsers', allActiveUsers);
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