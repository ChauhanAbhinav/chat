var socket = io();

	// on connection to server, ask for user's name with an anonymous callback
	socket.on('connect', function(){
        // call the server-side function 'adduser' and send one parameter (value of prompt)
		alert();
		socket.emit('adduser', prompt("What's your name?"));
	});
