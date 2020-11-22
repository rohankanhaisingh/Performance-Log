// Import objects and function from other modules.
import { handleObjectData } from './modules/commands/GetObject.js';
import { createOutputMessage, createWarningMessage } from './modules/output.js';


/**
 * Listen function. This function will be called when the user got connected to the server.
 * 
 * @param {SocketIO.Client} socket SocketIO Client object.
 */
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

    // Global event when the server has some warnings.
    socket.on("serverWarning", (data) => {
        createWarningMessage("PL", data.message);
    });

    // When the user requested a object and the server accepted the request, it will send the needed information to the webpage.
    socket.on("getobject:accept", (data) => {
        handleObjectData(data);
    });

    // Listen for powershell command output.
    socket.on("powershellCommandStdout", (data) => {
        createOutputMessage("PS", data);
    });

    // Log the Ngrok, Bungeecord and Spigot output in the webpage.
    socket.on("execute:ms_server:receive", (d) => {
        switch (d.type) {
            case "ngrok":
                if (d.d.indexOf("url") > -1) {
                    var a = d.d;
                    var b = a.substring(a.indexOf("url") + 10).split(" ")[0];
                    createOutputMessage("PL", `Created NGROK tunnel at url <code class="pl-link">${b}</code>.`) 
                }
                break;
            case "bungee":
                var a = d.d, b, c, e, f, h;
                b = a.split(" ");
                c = b[0];
                e = b[1];
                f = a.substring(a.indexOf(e) + e.length);
                createOutputMessage("PL", `<code class="bungee-time">${c}</code> <code class="bungee-type">${e}</code> ${f}`, ["bungee"]); 
                break;
            case "spigot":
                var a = d.d, b, c, e, f, h;
                b = a.split(" ");
                c = b[0];
                e = b[1];
                f = a.substring(a.indexOf(e) + e.length);
                createOutputMessage("PL", `<code class="bungee-time">${c}</code> <code class="bungee-type">${e}</code> ${f}`, ["bungee"]); 
                break;
        }
    });

    // Event when user disconnected from the server
    socket.on("disconnect", () => {
        socket.emit("disconnect", {});
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

/**
 * Emit data to the server using SocketIO.
 * @param {SocketIO.Client} socket
 * @param {string} t Name of data
 * @param {any} d Actual data.
 */
const emit = (socket, t, d) => {
    var a, b, c, d, e; 
    socket.emit(t, d);
}

export { listen, emit };