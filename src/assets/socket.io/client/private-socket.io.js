var socket = io('http://localhost:3000/private');

var user = Cookies.get('user');
var contact = Cookies.get('contact');
var room = Cookies.get('room');

// delete unusable cookies
Cookies.remove('contact', { path: '' });
Cookies.remove('room', { path: '' });
var userData = [user, contact, room];


socket.on('connect', function(){
    socket.emit('createRoom', userData);
});