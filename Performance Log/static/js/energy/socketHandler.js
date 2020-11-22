import { handleBatteryData } from './index.js';

/**
 * @param {SocketIO.Client} socket
 */
const listen = socket => {

    // Accepting a page request.
    socket.on("acceptPageRequest", function (data) {
        console.log(data);
        location.href = `./${data.page}`;
        socket.emit("handlePageSwitch", {
            time: Date.now(),
            expectedTimeInterval: 2000
        });
    });

    // Event when the client (user) received information about the battery..
    socket.on("initBatteryInformation", function (data) {
        handleBatteryData(data);
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

export { listen };