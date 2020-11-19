import { handleObjectData } from './modules/commands/GetObject.js';
import { createOutputMessage, createWarningMessage } from './modules/output.js';


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

    socket.on("serverWarning", function (data) {
        createWarningMessage("PL", data.message);
    });

    socket.on("getobject:accept", function (d) {
        handleObjectData(d);
    });

    socket.on("powershellCommandStdout", function (d) {
        createOutputMessage("PS", d);
    });

    socket.on("execute:ms_server:receive", function (d) {
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