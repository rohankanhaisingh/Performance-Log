const listen = socket => {
    // Accepting a page request.
    socket.on("acceptPageRequest", data => {

        location.href = `./${data.page}`;

        socket.emit("handlePageSwitch", {
            time: Date.now(),
            expectedTimeInterval: 2000
        });
    });

    // Event when the server got closed
    socket.on("serverClosed", data => {
        if (typeof $alert == 'function') {
            $alert("Server got closed");
        }
    });

    // Give a notification in-web if the server has a warning.
    socket.on("serverWarningNotification", data => {
        let noti = new WebNotification("Performance Log", data.subject, data.message, null, 6000).On("click", () => {
            socket.emit("requestPage", {
                page: "settings",
                time: Date.now(),
                id: socket.id
            });
        });
    });

    // Event when user disconnected from the server
    socket.on("disconnect", () => {
        socket.emit("disconnect", {});
    });

    const requestPage = page => {
        socket.emit("requestPage", {
            page: page,
            time: Date.now(),
            id: socket.id
        });
    }

    window['requestPage'] = requestPage;
}

export { listen };