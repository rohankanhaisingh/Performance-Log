import { handleSteamApps } from './index.js';

const listen = (socket) => {

    // Accepting a page request.
    socket.on("acceptPageRequest", (data) => {

        // Give the server a sign that the user is switching from page.
        socket.emit("handlePageSwitch", {
            time: Date.now(),
            expectedTimeInterval: 2000
        });

        location.href = `./${data.page}`; // Change the page.
    });

    const filter = (obj, key) => {
        let tempObjc = {};
        if (typeof obj == 'object') {
            for (let name in obj) {
                tempObjc[name] = obj[name];
            }

            return tempObjc;
        }
    }

    socket.on("compressedSteamApps", data => {
        let errDumpLog = [];

        try {
            let items = filter(JSON.parse(data), "value");

            for (let item in items) {
                handleSteamApps(items[item], item);
            }
        } catch (err) {
            errDumpLog.push(err);
        }
    });





    // Global event when the server has some warnings.
    socket.on("serverWarning", (data) => {
        createWarningMessage("PL", data.message);
    });

    // Event when user disconnected from the server
    socket.on("disconnect", () => {
        socket.emit("disconnect", {});
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

    /**
     * @param {string} page
     */
    const requestPage = (page) => {
        socket.emit("requestPage", {
            page: page,
            time: Date.now(),
            id: socket.id
        });
    }

    window['requestPage'] = requestPage;
}


export { listen };