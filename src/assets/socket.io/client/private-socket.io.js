if(socket) socket.close();
var socket = io('http://localhost:3000/private');
var user = Cookies.get('user');
var group = Cookies.get('group');

var userData = [user, group];
var FLAG_SENDER ;

// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
    // call the server-side function 'adduser' and send one parameter
    socket.emit('createRoom', userData);
});

socket.on('getVisibility', function(read){
  // update read 
  let updateRead = function(read) {
  // alert(read);
  if(read) {
    $('#read').html("Read &#10004;");}
    else{
      $('#read').html("")
    }
 
}
updateRead(read); 
});

socket.on('updatechat', function (username, data) {
  // alert('private update');
    if(username == user) { 
      // alert('if');
      $('#conversation').append('<li><b style="color: green">'+username + ':</b> ' + data + '<br></li>');
      FLAG_SENDER = true;
    }
  else {
    // alert('else')
    FLAG_SENDER = false;
    $('#conversation').append('<li><b>'+username + ':</b> ' + data + '<br></li>');
    
    socket.emit('sendVisibility', vis());
    $('#read').html("");
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
    //  alert('private send');
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
// visibility api
var vis = (function(){
  var stateKey, eventKey, keys = {
      hidden: "visibilitychange",
      webkitHidden: "webkitvisibilitychange",
      mozHidden: "mozvisibilitychange",
      msHidden: "msvisibilitychange"
  };
  for (stateKey in keys) {
      if (stateKey in document) {
          eventKey = keys[stateKey];
          break;
      }
  }
  return function(c) {
      if (c) document.addEventListener(eventKey, c);
      return !document[stateKey];
  }
})();
// update read when user come later in time
vis(function(){
  if(vis()){
    if(!FLAG_SENDER){
      socket.emit('sendVisibility', vis());
    }
    console.log('visible now');

  }
 });

