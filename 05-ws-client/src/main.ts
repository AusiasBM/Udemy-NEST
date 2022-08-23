import { connectToServer } from './socket-client';
import './style.css'
// import typescriptLogo from './typescript.svg'
// import { setupCounter } from './counter'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>

    <input id="jwt-token" type="text" placeholder="JWT Token" />
    <button id="btn-connect">Connect</button>

    <br>
    <span id='server-status'>Offline</span>

    <ul id='clients-ul'></ul>

    <form id="message-form">
      <input placeholder='Message' id='message-input' />
    </form>

    <h3>Messages</h3>
    <ul id='messages-ul'></ul>

  </div>
`

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
// connectToServer();

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {

  if( jwtToken.value.trim().length <= 0 ) return alert('JWT Token is required');

    connectToServer(jwtToken.value.trim());
});