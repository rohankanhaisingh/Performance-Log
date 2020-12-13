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
 * NOTE: Sorry if my grammar is bad.
 * 
*/

const express = require("express");
const socket = require("socket.io");

// Custom modules 
const request = require("./server/js/request");
const systeminfo = require("./server/js/systeminfo");
const settings = require("./server/js/settingsHandler");
const minecraftClient = require("./server/js/minecraft/minecraftClient");

// Discord.js
const discord = require("./server/js/discordPresence");

// Create a localserver.
const app = express();
app.use(express.static('./static', { extensions: ['html'] }));
const server = app.listen(8000);
const io = socket(server);

let dataInterval, initializedRichPresence = false, audioStreamInterval = false, listenMinecraftServer = false;

//if (!listenMinecraftServer) {
//    listenMinecraftServer = true;

//    minecraftClient.listen(io);
//}


const sendAudioStreamData = socket => {
    // No need to create a interval function for this. The powershell script already has a interval function.
    systeminfo.audio.audioStream(stream => {
        // Get the audio stream value and send it to the client.

        socket.emit("audioStreamSend", { d: ` ${stream}` });
    });


    let interval = setInterval(() => {
        systeminfo.audio.audioLevel(level => {
            socket.emit("audioLevelSend", { d: ` ${level}` });
        });
    }, 3000);
}


io.sockets.on("connection", socket => {

    // Initialize socket handlers.
    request.initialize(socket);

    if (!initializedRichPresence) {
        initializedRichPresence = true;

        discord.initialize(socket);
    }

    if (!audioStreamInterval) {
        audioStreamInterval = true;

        sendAudioStreamData(socket);
    }

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