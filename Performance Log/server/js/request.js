/*
 * Alright so this is looks pretty complicated but its not. Basically, socketio.js is listening for events from the webbrowser to handle.
 * That allows me to execute software related stuff from the server and not from the browser itself. 
 * 
*/

const systeminfo = require("./systeminfo");
const settings = require("./settingsHandler");
const fs = require("fs");
const { developerMode } = require("./settingsHandler");
const { changePresence } = require("./discordPresence");
const { stdout, stdin } = require("process"); 
const { audio } = require("./systeminfo");
const steamApps = require("./getSteamApps");

let isSwitchingPage, page, processes = [];

// Change the presence based on the page.
const pres = page => {
    changePresence("Browsing", `In-page: ${page}`);
}

// Initialize function. This function will be called when the user got connected to the server.
function init(socket) {

    // This is basically a ping-pong feauture, to check the response latency.
    socket.on("requestTime", function (pingTime) {
        let obj = {
            requestTime: pingTime,
            responseTime: Date.now()
        }
        socket.emit("responseTime", obj); 
    });

    // Handle pages that has been requested by the client (user) and send a response back to handle the page switch.
    socket.on("requestPage", function (data) {
        switch (data.page) {
            case "energy":
                // Direct the client (user) to the energy page.
                page = data.page;

                socket.emit("acceptPageRequest", {
                    page: data.page,
                    time: Date.now(),
                    message: "Page has been requested"
                });

                pres(page);
                break;
            case "index":
                // Direct the client (user) to the index page.
                page = data.page;


                socket.emit("acceptPageRequest", {
                    page: data.page,
                    time: Date.now(),
                    message: "Page has been requested"
                });

                pres(page);
                break;
            case "settings":
                // Direct the client (user) to the settings page.
                page = data.page;

                socket.emit("acceptPageRequest", {
                    page: data.page,
                    time: Date.now(),
                    message: "Page has been requested"
                });

                pres(page);
                break;
            case "commandline":
                // Direct the client (user) to the commandline page.
                page = data.page;

                socket.emit("acceptPageRequest", {
                    page: data.page,
                    time: Date.now(),
                    message: "Page has been requested"
                });

                pres(page);
                break;
            case "games":
                // Direct the client (user) to the commandline page.
                page = data.page;

                socket.emit("acceptPageRequest", {
                    page: data.page,
                    time: Date.now(),
                    message: "Page has been requested"
                });

                pres(page);
                break;
            default:
                // If none of these cases matches, send a message back that the request has been denied.

                socket.emit("deniedPageRequest", {
                    time: Date.now(),
                    message: "Failed to request the page. The page does not exist",
                });
                break;
        }
    });

    // Execute Microsoft Powershell commands and return the value back to the webpage. Feature works but not stable yet.
    socket.on("powershellcommand", function (data) {
        let proc = require("child_process").exec("powershell.exe " + data, function (stdin, stdout) {
            socket.emit("powershellCommandStdout", stdout);
        });
    });

    // Event when the client (user) is switching from pages. This prevents the application to close when the client (user) gets "disconnected".
    socket.on("handlePageSwitch", function (data) {
        isSwitchingPage = true;
        setTimeout(function () {
            isSwitchingPage = false;
        }, data.expectedTimeInterval);
    });

    // Event when the client (user) got connected.
    socket.on("clientConnect", function (data) {
        page = data.page; // Set the page what page the client (user) is using.


        if (typeof data.request !== 'undefined') {
            switch (data.request) {
                case 'systemInformation':
                    systeminfo.all.initialize(data => {
                        socket.emit("initHardwareInformation", data);
                    });
                    break;
                case "batteryInformation":
                    systeminfo.battery.initialize(data => {
                        socket.emit("initBatteryInformation", data);
                    })
                    break;
                case "games":
                    steamApps.getAll(data => {
                        socket.emit("compressedSteamApps", data);
                    });
                    break;
            }
        }
    });

    // Handle the Get-Object command.
    socket.on("getobject", function (a) {
        switch (a.type) {
            case "mem":
                // If the type is memory
                systeminfo.ram.initialize(b => {
                    // Get all the memory information and send it to the webpage.

                    socket.emit("getobject:accept", { type: "mem", data: b, get: a.get});
                });

                break;
        }
    });

    // Start and host a minecraft server. Unstable function, does not work yet.
    socket.on("execute:ms_server", function (a) {
        // I was testing this feature and it works pretty accurate. I just have to clear everything.

        if (false) {

            const ngrok = require("child_process").spawn("test.ngrok.bat"); // Creates a new child_process object. 

            // Listen for output from this process.
            ngrok.stdout.on("data", function (data) {
                // Emit the data to the webpage.

                socket.emit("execute:ms_server:receive", { type: "ngrok", d: `${data}` });
            });

            ngrok.stdin.end(); 
            processes.push(ngrok);

            // Same works for this process.
            const bungee = require("child_process").spawn("test.bungee.bat");

            bungee.stdout.on("data", function (data) {
            
                socket.emit("execute:ms_server:receive", { type: "bungee", d: `${data}` });
            });
            bungee.stdin.end();
            processes.push(bungee);

            // And this process.
            const spigot = require("child_process").spawn("test.spigot.bat");

            spigot.stdout.on("data", function (data) {

                socket.emit("execute:ms_server:receive", { type: "spigot", d: `${data}` });
            });
            spigot.stdin.end();
            processes.push(spigot);
        }
    });

    // Save file from edited text fields in the webpage.
    socket.on("saveFile", function (data) {
        try {
            fs.writeFileSync("./static/view/" + data.path, data.content);
        } catch (err) {
            socket.emit("serverWarning", {
                time: Date.now(),
                message: err.message
            });
        }
    });

    // Unstable function. This will close every running Minecraft Server process.
    socket.on("execute:ms_server:close", function (data) {
        if (developerMode) {
            processes.forEach(function (proc) {
                proc.kill("SIGINT");
            });
            socket.emit("serverWarning", {
                time: Date.now(),
                message: "Server will be closed in 10 seconds to make sure every Minecraft Server processes has been closed. If you see a commandline opening after the server has been closed, make sure to kill it using taskmanager."
            });
            setTimeout(function () {
                process.exit();
            }, 10000);
        }
    });

    // Event when the user has changed some settings from the webpage.
    socket.on("settingChange", function (data) {

        // Handle the settings.
        settings.changeSetting(data);
    });

    // Event when the user wants to stop this application.
    socket.on("process.exit", function () {

        // Send a message back to the browser that the server got closed.
        socket.emit("serverClosed", {
            time: Date.now(),
        });

        if (!settings.developerMode) {

            // Open the SERVER_DISCONNECT vbs file.
            var errMessage = require('child_process').exec("start ./server/messages/SERVER_DISCONNECT.vbs", function (err, stdout, stderr) { });
        }

        // Close the NodeJS application.
        process.exit();
    });


    // Event when the client (user) got disconnected.
    socket.on("disconnect", function () {
        if (!isSwitchingPage) {
            console.log(`User disconnected at ${Date.now()}`);

            if (!settings.developerMode) {

                // Open the SERVER_DISCONNECT vbs file.
                var errMessage = require('child_process').exec("start ./server/messages/SERVER_DISCONNECT.vbs", function (err, stdout, stderr) {
                    console.log(stdout);
                });

                // Close the NodeJS application.
                process.exit();
            }

            systeminfo.audio.destroy('all');
           
        }
    });

    return {
        then: function (callback) {
            if (typeof callback !== 'undefined' && typeof callback == 'function') {
                callback();
            }
        }
    }
}


// Exports this epic stuff.
module.exports = {
    initialize: init,
    isSwitchingPage: isSwitchingPage,
    page: page,
    time: Date.now(),
}