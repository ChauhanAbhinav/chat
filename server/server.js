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
var router = require('./routes/loginRoutes');
app.use('/', router); // applying routes to the app

// starting the server
http.listen(3000, function(){
    console.log('server is listening on port '+PORT);
});

// socket.io =====================================

io.on('connection', function(socket){
    console.log('a user connected');
    io.emit('server','a user has joined the room');
  
    socket.on('disconnect', function(){
      console.log('user disconnected');
    io.emit('server','a user left the room');
    });
});  
