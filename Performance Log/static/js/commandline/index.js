import * as sh from './sockethandler.js';
import * as inputHandler from './modules/inputHandler.js';

const socket = io.connect("http://localhost:8000/");
let commandType = "performanceLog";

sh.listen(socket); // Start listening for events when the client (user) got connected to the server.


// Give the server a sign that the client (user) got connected.
socket.emit("clientConnect", {
    page: 'index',
    time: Date.now(),
    id: socket.id,
});

/**
 * Changes the command type
 * @param {string} a command.
 */
const changeCommandType = a => {
    commandType = a;
}

inputHandler.listen($g(".commandline-input-textfield-ce"));

export { commandType, socket, changeCommandType };