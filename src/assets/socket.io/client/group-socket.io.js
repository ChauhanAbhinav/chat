
var g_socket = io('http://localhost:3000/group');
var user = Cookies.get('user');
var group = Cookies.get('group');
// on connection to server, ask for user's name with an anonymous callback
g_socket.on('connect', function(){
    // call the server-side function 'adduser' and send one parameter
    g_socket.emit('adduser', user, group); 
});

g_socket.on('updatechat', function (username, data) {
  // alert('public update');
  if(username == user){
    $('#conversation').append('<li><b style="color: green">'+username + ':</b> ' + data + '<br></li>');
  } else {
    $('#conversation').append('<li><b>'+username + ':</b> ' + data + '<br></li>');

  }
});

g_socket.on('server',function(msg){
    $('#conversation').append('<li class="server" style="background: #ededed" > <b>Server: </b>'+msg+'</li>');
});
g_socket.on('end',function(){
});
// on load of page
$(function(){

function sendChat(){
  var message = $('#chat-input').val();
    $('#chat-input').val('');
    // alert('public send');
     g_socket.emit('sendchat', message);
}
  // when the client hits ENTER on their keyboard
  $('#chat-input').keypress(function(e) {
    if(e.which == 13) {
      // $(this).blur();
      // $('#send').focus().click();
      sendChat();
    }
  });
    // when the client clicks SEND
    $('#send').click( function() {
      sendChat();
    });
});

