if(socket) socket.close();
var socket = io('http://localhost:3000/public');
var user = Cookies.get('user');
// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
    // call the server-side function 'adduser' and send one parameter
    socket.emit('adduser', user); 
});

socket.on('updatechat', function (username, data) {
  // alert('public update');
  if(username == user){
    $('#conversation').append('<li><b style="color: green">'+username + ':</b> ' + data + '<br></li>');
  } else {
    $('#conversation').append('<li><b>'+username + ':</b> ' + data + '<br></li>');

  }
});

socket.on('server',function(msg){
    $('#conversation').append('<li class="server" style="background: #ededed" > <b>Server: </b>'+msg+'</li>');
});

// on load of page
$(function(){
  // when the client clicks SEND
  $('#send').click( function() {
    var message = $('#chat-input').val();
    $('#chat-input').val('');
    // alert('public send');
     socket.emit('sendchat', message);
  });

  // when the client hits ENTER on their keyboard
  $('#chat-input').keypress(function(e) {
    if(e.which == 13) {
      $(this).blur();
      $('#send').focus().click();
    }
  });
});

