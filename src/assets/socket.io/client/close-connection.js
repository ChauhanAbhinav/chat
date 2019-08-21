// var sock;
if(typeof socket !== 'undefined') {

    socket.emit('sendVisibility', false);
    console.log('connection is closed');
    socket.disconnect();
}else{
console.log('no connection is open');
}