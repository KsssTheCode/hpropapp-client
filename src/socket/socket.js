import openSocket from 'socket.io-client';

const socket = openSocket(process.env.REACT_APP_API_HOST, {
   cors: { origin: process.env.REACT_APP_API_HOST },
});

export default socket;
