import { handleObjectData } from './modules/commands/GetObject.js';


function listen(socket) {
    // Accepting a page request.
    socket.on("acceptPageRequest", function (data) {
        console.log(data);
        location.href = `./${data.page}`;
        socket.emit("handlePageSwitch", {
            time: Date.now(),
            expectedTimeInterval: 2000
        });
    });

    socket.on("getobject:accept", function (d) {
        handleObjectData(d);
    });

    // Event when user disconnected from the server

    socket.on("disconnect", function () {
        socket.emit("disconnect", {});
    });

    const requestPage = function (page) {
        socket.emit("requestPage", {
            page: page,
            time: Date.now(),
            id: socket.id
        });
    }

    window['requestPage'] = requestPage;
}

function emit(socket, t, d) {
    var a, b, c, d, e; 
    socket.emit(t, d);
}

export { listen, emit };