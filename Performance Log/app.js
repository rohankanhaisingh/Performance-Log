const express = require("express");
const socket = require("socket.io");

// Custom modules 
const request = require("./server/js/request");
const systeminfo = require("./server/js/systeminfo");
const settings = require("./server/js/settingsHandler");

var app = express();
app.use(express.static('./static', { extensions: ['html'] }));
var server = app.listen(8000);
var io = socket(server);


var dataInterval;


io.sockets.on("connection", function (socket) {

    // Initialize socket handlers.
    request.initialize(socket);

    function getSystemInformation() {
        if (!settings.developerMode) {
            systeminfo.cpu.update(function (d) {
                socket.emit("updatedData", { type: 'cpu', data: d });
            });
            setTimeout(function () {
                systeminfo.ram.update(function (d) {
                    socket.emit("updatedData", { type: 'ram', data: d });
                });
            }, settings.dataInterval);
        }
    }

    systeminfo.disk.intialize(function (d) {
        socket.emit("updatedData", { type: 'disk', data: d });
    });

    if (dataInterval) {
        clearInterval(dataInterval);
    }

    dataInterval = setInterval(getSystemInformation, 2000)
});

if (!settings.developerMode) {
    var browserProcess = require('child_process').exec("start http://localhost:8000/view?dashboard", function (err, stdout, stderr) { });
}