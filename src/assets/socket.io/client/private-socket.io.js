var socket = io('http://localhost:3000/private');
var user = Cookies.get('user');
var group = Cookies.get('group');

userData = [user, group];

// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
    // call the server-side function 'adduser' and send one parameter
    socket.emit('createRoom', userData);
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

  var isActive;
  $(window).focus(function() { isActive = true; });
  $(window).blur(function() { isActive = false; });
});

