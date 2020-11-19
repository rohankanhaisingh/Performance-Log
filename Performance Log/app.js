/*
 * Performance Log (c) by Rohan Kanhaisingh.
 * 
 * Performane Log is a opensource web application that will monitor your system information. 
 * This application is free to use. Its still under construction; some features might not work and you might experience some bugs. 
 * I try to add as much as I can to this project. 
 * 
 * If you want more information about something specific, feel free to send me a message on Instagram (@rohankanhaisingh)!
 * 
 * Enjoy Performance Log.
 * 
 * NOTE: Sorry if my grammar is bad. English is not 100% perfect for me :(.
 * 
*/

const express = require("express");
const socket = require("socket.io");

// Custom modules 
const request = require("./server/js/request");
const systeminfo = require("./server/js/systeminfo");
const settings = require("./server/js/settingsHandler");

// Create a localserver.
var app = express();
app.use(express.static('./static', { extensions: ['html'] }));
var server = app.listen(8000);
var io = socket(server);


var dataInterval;


io.sockets.on("connection", function (socket) {

    // Initialize socket handlers.
    request.initialize(socket);

    // Function to receive the systeminformation from the systeminfo.js module.
    function getSystemInformation() {
        if (!settings.developerMode) {
            // If developers mode is not equal to false.

            // Get the CPU data en emit it to the local webserver.
            systeminfo.cpu.update(function (d) {
                socket.emit("updatedData", { type: 'cpu', data: d });
            });

            // Get the memory data and emit it to the local webserver.
            setTimeout(function () {
                systeminfo.ram.update(function (d) {
                    socket.emit("updatedData", { type: 'ram', data: d });
                });
            }, settings.dataInterval);
        }
    }

    // Initialize disk information and emit it to the local webserver.
    systeminfo.disk.intialize(function (d) {
        socket.emit("updatedData", { type: 'disk', data: d });
    });

    if (dataInterval) {
        clearInterval(dataInterval);
    }

    dataInterval = setInterval(getSystemInformation, 2000);
});

// Open the webbrowser for non-developers.
if (!settings.developerMode) {
    var browserProcess = require('child_process').exec("start http://localhost:8000/view?dashboard", function (err, stdout, stderr) { });
}