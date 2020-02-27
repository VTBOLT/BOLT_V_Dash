import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function subscribeToCAN(cb) {
    socket.on('rpm', rpm => cb(null, rpm));
    socket.emit('subscribeToCAN');
}

export { subscribeToCAN }