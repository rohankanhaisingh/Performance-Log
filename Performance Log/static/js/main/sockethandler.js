import { handleInitializedData, handleUpdatedData } from "./index.js";

/**
 * .
 * @param {SocketIO.Client} socket
 */
const listen = socket => {
    socket.on("initHardwareInformation", function (data) {
        handleInitializedData(data);
    });

    socket.on("updatedData", function (data) {
        handleUpdatedData(data);
    });

    // Accepting a page request.
    socket.on("acceptPageRequest", function (data) {
        console.log(data);
        location.href = `./${data.page}`;
        socket.emit("handlePageSwitch", {
            time: Date.now(),
            expectedTimeInterval: 2000
        });
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