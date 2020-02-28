import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function subscribeToCAN() {
    // socket.on('rpm', rpm => cb(null, rpm));
    //socket.on soc, etc
    socket.emit('subscribeToCAN');
}

function getSocket() {
    return socket;
}

export { subscribeToCAN, getSocket }