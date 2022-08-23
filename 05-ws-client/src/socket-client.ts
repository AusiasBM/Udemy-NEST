import { Manager, Socket } from 'socket.io-client';

let socket: Socket;

export const connectToServer = ( token: string ) => {

    const manager = new Manager('localhost:3500/socket.io/socket.io.js', {
        extraHeaders: {
            hola: 'mundo',
            'authorization': token
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket('/');


    addListeners();
}



const addListeners = () => {

    // socket.on es para escuchar eventos del servidor
    // socker.emit es para emitir eventos al servidor
    const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!;

    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;

    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;


    socket.on('connect', () => {
        //console.log('Connected to server');
        document.querySelector<HTMLSpanElement>('#server-status')!.innerText = 'Online'
    });

    socket.on('disconnect', () => {
        //console.log('Disconnected from server');
        document.querySelector<HTMLSpanElement>('#server-status')!.innerText = 'Offline'
    });

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach(clientId => {
            clientsHtml += `<li>${clientId}</li>`
        });

        clientsUl.innerHTML = clientsHtml;
    });


    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if( messageInput.value.trim().length <= 0 ) return;
        
        socket.emit('message-from-client', { 
            id: 'YO!!!', 
            message: messageInput.value
        });

        messageInput.value = '';

    });

    socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
        const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>: ${payload.message}
            </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.appendChild(li);
    });
}