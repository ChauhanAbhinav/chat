// socket: one to one (Private)
if(typeof socket !== 'undefined') {
    socket.emit('sendVisibility', true); // on chat route active active
}else{
console.log('no connection is open');
}