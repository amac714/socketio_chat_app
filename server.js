const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(express.static("public"));
app.set("port", process.env.port || 4040);

const io = require("socket.io").listen(server);

let userNames = {};

io.on('connection', function(socket){

  //socket.on add user function(username)
  // add username as socket atribute
  //socket.username = username
  //userNames[username] = username

  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

});


server.listen(app.get("port"), () => {
  console.log("Server listening on port", app.get('port'));
});