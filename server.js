const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(express.static("public"));
app.set("port", process.env.port || 4040);

const io = require("socket.io").listen(server);

let userNames = {};

io.on('connection', function(socket) {

  //socket.on add user function(username)
  socket.on('addUser', function(username) {
    // add username as socket atribute
    socket.username = username;
    userNames[username] = username;
    
    socket.emit('chatMessage', 'Server', 'You have connected');
  });
  

  socket.on('chatMessage', function(msg) {
    io.sockets.emit('chatMessage', socket.username, msg);
  });

  socket.on('disconnect', function() {
    delete userNames[socket.username];

    socket.broadcast.emit('chatMessage', 'Server', `${socket.username} has disconnected`);
  });

});


server.listen(app.get("port"), () => {
  console.log("Server listening on port", app.get('port'));
});