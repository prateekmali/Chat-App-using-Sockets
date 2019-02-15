var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

   // whenever someone connects this will be executed  
   // var clients = 0;
// var roomno = 1;
// users = [];
// io.on('connection', function(socket) {
  //  console.log('A user connected');
  //  socket.on('clientEvent', function(data) {
  //     console.log(data);
  // });
 // //Send a message after a timeout of 4seconds
 //   setTimeout(function() {
 //      socket.send('Sent a message 4seconds after connection!');
 //   }, 4000);

   // setTimeout(function() {
   //    //Sending an object when emmiting an event
   //    socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
   // }, 4000);

   //Whenever someone disconnects this will be executed
   // socket.on('disconnect', function () {
   //    console.log('A user disconnected');
   // });
   //    clients++;
   // io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
   // socket.on('disconnect', function () {
   //    clients--;
   //    io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});

//    clients++;
//    socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
//    socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'});
//    socket.on('disconnect', function () {
//    clients--;
//    socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'});

//    });
// });

// var nsp = io.of('/my-namespace');
// nsp.on('connection', function(socket) {
//    console.log('someone connected');
//    nsp.emit('hi', 'Hello everyone!');
// });

// if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 1) {
// 	roomno++;
// }
//    socket.join("room-"+roomno);

   //Send this event to everyone in the room.
   // io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);

// var clients = 0;
// io.on('connection', function(socket) {
//    clients++;
//    socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
//    socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
//    socket.on('disconnect', function () {
//       clients--;
//       socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
//    });

users = [];
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('setUsername', function(data) {
      console.log(data);
      
      if(users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', {username: data});
      }
   });
   
   socket.on('msg', function(data) {
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   })
});

http.listen(3000, function() {
   console.log('listening on *:3000');
});