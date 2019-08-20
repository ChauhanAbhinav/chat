var socket = io('http://localhost:3000/public');
var username = Cookies.get('user');
// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
    // call the server-side function 'adduser' and send one parameter

    socket.emit('adduser', username); //Math.round(Math.random()*1000))
});

socket.on('updatechat', function (username, data) {
    $('#conversation').append('<li><b>'+username + ':</b> ' + data + '<br></li>');
});

socket.on('server',function(msg){
    $('#conversation').append('<li> <b>Server: </b>'+msg+'</li>');
});

// on load of page
$(function(){
  // when the client clicks SEND
  $('#send').click( function() {
    var message = $('#chat-input').val();
    $('#chat-input').val('');
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

