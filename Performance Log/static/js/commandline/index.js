import * as sh from './sockethandler.js';
import * as inputHandler from './modules/inputHandler.js';

var socket = io.connect("http://localhost:8000/");

sh.listen(socket);

socket.emit("clientConnect", {
    page: 'index',
    time: Date.now(),
    id: socket.id,
});


var commandType = "performanceLog";

function changeCommandType(a) {
    commandType = a;
}

inputHandler.listen($g(".commandline-input-textfield-ce"));

export { commandType, socket, changeCommandType };