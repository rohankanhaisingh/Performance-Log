const systeminfo = require("./systeminfo");
const settings = require("./settingsHandler");

var isSwitchingPage, page;

function init(socket) {
    socket.on("requestTime", function (pingTime) {
        var obj = {
            requestTime: pingTime,
            responseTime: Date.now()
        }
        socket.emit("responseTime", obj);
    });

    socket.on("requestPage", function (data) {
        switch (data.page) {
            case "energy":
                page = data.page;
                socket.emit("acceptPageRequest", {
                    page: data.page,
                    time: Date.now(),
                    message: "Page has been requested"
                });
                break;
            case "index":
                page = data.page;
                socket.emit("acceptPageRequest", {
                    page: data.page,
                    time: Date.now(),
                    message: "Page has been requested"
                });
                break;
            case "settings":
                page = data.page;
                socket.emit("acceptPageRequest", {
                    page: data.page,
                    time: Date.now(),
                    message: "Page has been requested"
                });
                break;
            case "commandline":
                page = data.page;
                socket.emit("acceptPageRequest", {
                    page: data.page,
                    time: Date.now(),
                    message: "Page has been requested"
                });
                break;
            default:
                socket.emit("deniedPageRequest", {
                    time: Date.now(),
                    message: "Failed to request the page. The page does not exist",
                });
                break;
        }
    });

    socket.on("handlePageSwitch", function (data) {
        isSwitchingPage = true;
        setTimeout(function () {
            isSwitchingPage = false;
        }, data.expectedTimeInterval);
    });

    socket.on("clientConnect", function (data) {
        page = data.page;
        if (typeof data.request !== 'undefined') {
            switch (data.request) {
                case 'systemInformation':
                    systeminfo.all.initialize(function (data) {
                        socket.emit("initHardwareInformation", data);
                    });
                    break;
                case "batteryInformation":
                    systeminfo.battery.initialize(function (data) {
                        socket.emit("initBatteryInformation", data);
                    })
                    break;
            }
        }
    });

    socket.on("getobject", function (a) {
        switch (a.type) {
            case "mem":
                systeminfo.ram.initialize(function (b) {
                    socket.emit("getobject:accept", { type: "mem", data: b, get: a.get});
                });
                break;
        }
    });

    socket.on("settingChange", function (data) {
        settings.changeSetting(data);
    });

    socket.on("process.exit", function () {
        socket.emit("serverClosed", {
            time: Date.now(),
        });

        if (!settings.developerMode) {
            var errMessage = require('child_process').exec("start ./server/messages/SERVER_DISCONNECT.vbs", function (err, stdout, stderr) { });
        }
        process.exit();
    });

    socket.on("disconnect", function () {
        if (!isSwitchingPage) {
            console.log(`User disconnected at ${Date.now()}`);

            if (!settings.developerMode) {
                var errMessage = require('child_process').exec("start ./server/messages/SERVER_DISCONNECT.vbs", function (err, stdout, stderr) { });
                process.exit();
            }
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

module.exports = {
    initialize: init,
    isSwitchingPage: isSwitchingPage,
    page: page,
    time: Date.now()
}