import io from 'socket.io-client';
import { getCookie } from '../hooks/utils';

const SOCKET_URL = 'ws://localhost:5000'; // URL вашего Socket.IO сервера
const socketProps = {
    transports: ['websocket'], 
    cookies: getCookie('userId'), 
    autoConnect: false,
    query: {
        url: window.location.href
    }
}

export const menuSocket = io(`${SOCKET_URL}/Menu`, socketProps );
export const gameSocket = io(`${SOCKET_URL}/Game`, socketProps );
//socket.emit('set-userId', document.cookie)
menuSocket.on('connection', (data) => {
   document.cookie = `sid=${data.sid}; path=/`;
   document.cookie = `userId=${data.userId}; path=/`;
 })

export const connectSocket = () => {
    socket.connect();
};

export const disconnectSocket = () => {
    socket.disconnect();
};

export const updateGames = () => {
    menuSocket.emit('update-games');
};

export const onUpdateGames = (callback) => {
    menuSocket.on('update-games', callback);
};

export const onRedirectOnGame = (callback) => {
    menuSocket.on('redirect-on-game', callback);
};