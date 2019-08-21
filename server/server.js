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
app.use('/', loginRouter); // applying routes to the app
app.use('/', chatRouter); // applying routes to the app

// starting the server
http.listen(3000, function(){
    console.log('server is listening on port '+PORT);
});

// socket.io  -public=====================================

io_public = io.of('/public');  // namespace public
public_usernames = [];
io_public.on('connection', function(socket){
  
    socket.on('adduser', function(username){
     
        socket.username = username;
        public_usernames[username] = username
	  	  socket.room = 'public'; //assign default public room
        socket.join(socket.room);
        // console.log(public_usernames);

		    // echo to client they've connected
		    socket.emit('server', 'you have connected to a public room');

        // echo to public room that a person has connected to their room
		    socket.broadcast.to('public').emit('server', '<i>' + socket.username + '</i> has connected to this room');

      
});

socket.on('sendchat', function (data) {
  // we tell the client to execute 'updatechat' with 2 parameters 
  console.log('server recieve chat');
  io_public.to(socket.room).emit('updatechat', socket.username, data);
});

socket.on('disconnect', function(){
  socket.broadcast.to('public').emit('server','<i>' + socket.username + '</i> has left the room');
  socket.emit('end');
  socket.leave(socket.room);
  delete public_usernames[socket.username];
  // console.log(usernames);
});

});

 // socket.io  - private =================================================

io_private = io.of('/private');  // namespace public
private_rooms = [];
io_private.on('connection', function(socket){

  socket.on('createRoom', function(userData){
    socket.username = userData[0];
    socket.room = userData[1];
    private_rooms[socket.room] = socket.room;
    // console.log(private_rooms);
    socket.join(socket.room);
    // console.log(usernames);

		// echo to client they've connected
		socket.emit('server', 'you have connected to a private room: '+socket.room);

    // echo to public room that a person has connected to their room
		socket.broadcast.to(socket.room).emit('server', '<i>' + socket.username + '</i> has connected to this room');
});

socket.on('sendchat', function (data) {
  // we tell the client to execute 'updatechat'
  io_private.to(socket.room).emit('updatechat', socket.username, data);
});

socket.on('sendVisibility', function(vis){
  socket.broadcast.to(socket.room).emit('getVisibility', vis)
})
socket.on('disconnect', function(){
  socket.broadcast.to(socket.room).emit('server','<i>' + socket.username + '</i> has left the room');
  socket.broadcast.to(socket.room).emit('getVisibility', false);
  socket.leave(socket.room);
  delete socket.room;
  delete socket.username;
 });

});
