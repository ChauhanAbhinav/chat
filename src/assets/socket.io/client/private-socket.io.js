var socket = io('http://localhost:3000/private');
var user = Cookies.get('user');
var group = Cookies.get('group');

userData = [user, group];


// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
    // call the server-side function 'adduser' and send one parameter
    socket.emit('createRoom', userData);
});

socket.on('getVisibility', function(read){
updateRead(read);  
});
  
let updateRead = function(read) {
  // alert(read);
  if(read) {
    $('#read').html("Read &#10004;");}
    else{
      $('#read').html("")
    }
}

socket.on('updatechat', function (username, data) {
    $('#conversation').append('<li><b>'+username + ':</b> ' + data + '<br></li>');
      
    if(username == user) { 
      // alert('if');
    }
  else {
    // alert('else')
    socket.emit('sendVisibility', vis());
    $('#read').html("");
  }
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
vis(function(){
  if(vis()){
    console.log('visible now');
//     setTimeout(function(){
//       console.log('visible now');
// alert();
//     }, 5000)
  }
 });

