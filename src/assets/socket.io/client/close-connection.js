// var sock;
if(typeof p_socket !== 'undefined') {

    console.log('connection is closed');
    p_socket.disconnect();
}else{
console.log('no connection is open');
}