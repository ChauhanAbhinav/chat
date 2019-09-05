// dependencies
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const bodyParser = require('body-parser');
const cors = require('cors');

// configuration
const PORT = 3000 || process.env.PORT ;
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//importing routes
var loginRouter = require('./routes/loginRoutes');
var chatRouter = require('./routes/chatRoutes');
var userService = require('./db/services/user.service');
app.use('/', loginRouter); // applying routes to the app
app.use('/', chatRouter); // applying routes to the app

// starting the server
http.listen(3000, function(){
    console.log('server is listening on port '+PORT);
});

 // socket.io  - private =================================================

io_private = io.of('/private');  // namespace public
socketTable = [];  // server will maintain a table of all sockets and their rooms

io_private.on('connection', function(socket){
  // on user connection

  console.log('user connected to private:' + socket.id);

rooms = [];
socket.on('username', function(username){
  username = Number(username);
  socket.username = username;
  socketTable[username] = { socketId: socket.id, username: username, rooms: []}
  console.log('Socket Table:-', socketTable);
});

socket.on('joinRoom', function(username, contact, room){
   // create room
  socket.username = Number(username);
  contact = Number(contact);
  socketTable[username].rooms[room] = {contact: contact, room: room}; // update socket table
  socket.join(room);

  console.log(username + ' joined private room: ' + room);
  // check if contact is connected in socket table, if yes join the contact
  if(socketTable[contact])
  {
    id = socketTable[contact].socketId; 

    if(socketTable[contact].rooms[room])
    {
      // contact is connected an room is assigned
    }
    else { 
      // contact is connected but room is not assigned
      // join contact to remove
      id = socketTable[contact].socketId; 
      io_private.connected[id].join(room);
      // update socket table
      socketTable[contact].rooms[room] = {contact: contact, room: room};
    }
  }
  else{
    // contact is not connected
  }
  console.log('Socket Table:-', socketTable);
});

socket.on('deleteRoom', function(username, contact, room){
  // rooms.push(room);
  username = Number(username);
  contact = Number(contact);
  
  socket.leave(room);
  console.log('user deleted the room: '+room);
  delete socketTable[username].rooms[room];
  // remove contact from room also
  if(socketTable[contact])
  {
    if(socketTable[contact].rooms[room])
    {
      // contact is connected and has joined the room
       id = socketTable[contact].socketId;
       io_private.connected[id].leave(room);
       // update socket table
       delete socketTable[contact].rooms[room];
       }
    else { 
      // contact is connected but room is not assigned
    }
  }
  else{
    // contact is not connected
  }
  console.log('Socket Table:-', socketTable);
});

socket.on('sendchat', function (user, contact, room, msg, messageId) {
  if(socketTable[user].rooms[room])
  {
  console.log('chat recieved in room: ' + room + ' from ' + 'user');

  // notification update to rooms
  socket.broadcast.to(room).emit('notificationAlert', user, contact, room, msg);
  // save chat to db  
  userService.saveChat(user, contact, room, msg, messageId)
  .then((data)=>{
    // success
    io_private.to(room).emit('updatechat', user, contact, room, msg, messageId);
  },
  (err)=>{
    // error
  });
  }
});

socket.on('sendVisibility', function(visibility, room){
  socket.broadcast.to(room).emit('getVisibility', visibility, room)
  if(visibility){
    userService.updateRead(room)
    .then(
      data => {
        // success
      },
      err => {
        // error
      }
    )
  }
  
})
// on user disconnection
socket.on('disconnect', function(){
  console.log('user disconnected: '+socket.id);
  // socket.broadcast.to(socket.room).emit('getVisibility', false);
  rooms.forEach(room => {
    console.log('user leaved the room: '+room);
    socket.leave(room);
  });
  delete socketTable[socket.username];
  delete socket.username;
  console.log('Socket Table:-', socketTable);
 });

});



// socket.io  -groups=====================================

// io_group = io.of('/group');  // namespace public
// io_group.on('connection', function(socket){
//   console.log('user connected to group namespace:' + socket.id);
//     socket.on('adduser', function(username, group){
     
//         socket.username = username;
// 	  	  socket.room = group; //assign default public room
//         socket.join(socket.room);
//         console.log('user joined group: ' + socket.room);
//         // echo to client they've connected
// 		    socket.emit('server', 'you have connected to a private group: '+ socket.room);

//         // echo to public room that a person has connected to their room
// 		    socket.broadcast.to(socket.room).emit('server', '<i>' + socket.username + '</i> has connected to this room');

      
// });

// socket.on('sendchat', function (data) {
//   // we tell the client to execute 'updatechat' with 2 parameters 
//   console.log('server recieve chat');
//   io_group.to(socket.room).emit('updatechat', socket.username, data);
// });

// socket.on('disconnect', function(){
//   socket.broadcast.to(socket.room).emit('server','<i>' + socket.username + '</i> has left the room');
//   socket.emit('end');
//   socket.leave(socket.room);
// });

// });


// // socket.io  -public=====================================

// io_public = io.of('/public');  // namespace public
// public_usernames = [];
// io_public.on('connection', function(socket){
  
//     socket.on('adduser', function(username){
     
//         socket.username = username;
//         public_usernames[username] = username
// 	  	  socket.room = 'public'; //assign default public room
//         socket.join(socket.room);
//         // console.log(public_usernames);

// 		    // echo to client they've connected
// 		    socket.emit('server', 'you have connected to a public room');

//         // echo to public room that a person has connected to their room
// 		    socket.broadcast.to('public').emit('server', '<i>' + socket.username + '</i> has connected to this room');

      
// });

// socket.on('sendchat', function (data) {
//   // we tell the client to execute 'updatechat' with 2 parameters 
//   console.log('server recieve chat');
//   io_public.to(socket.room).emit('updatechat', socket.username, data);
// });

// socket.on('disconnect', function(){
//   socket.broadcast.to('public').emit('server','<i>' + socket.username + '</i> has left the room');
//   socket.emit('end');
//   socket.leave(socket.room);
//   delete public_usernames[socket.username];
//   // console.log(usernames);
// });

// });
