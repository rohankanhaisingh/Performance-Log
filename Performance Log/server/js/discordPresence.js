const rpc = require("discord-rpc");
const fs = require("fs");

const client = new rpc.Client({ transport: "ipc" });

let clientLoaded = false;
let allowPresence = false; 

// Initialize the presence.
const _init = (socket) => {

    // Load and parse the settings json file.
    const settings = JSON.parse(fs.readFileSync("./static/user/settings.json", "utf-8"));

    // Check if useDiscordPresence is not undefined.
    if (typeof settings["useDiscordPresence"] !== 'undefined') {

        // If useDiscordPresence is equal to true.
        if (settings["useDiscordPresence"] == true) {

            // Check if the client id is not undefined.
            if (typeof settings["discordPresenceClientID"] !== "undefined" && settings["discordPresenceClientID"] !== null) {

                allowPresence = true; // Set allowPresence to true.

                // Event when the client is ready.
                client.on("ready", function () {
                    clientLoaded = true;

                    client.setActivity({
                        details: "Waiting for actions.",
                        state: "Version 0.7.2",
                        largeImageKey: "icon",
                        largeImageText: "Performance Log version 0.7.2",
                    });
                });
                // Login the client to a discord developer application.
                client.login({
                    clientId: settings["discordPresenceClientID"]
                });
            } else {
                socket.emit("serverWarningNotification", {
                    subject: "No valid client ID.",
                    time: Date.now(),
                    message: "Cannot use the presence feature because the property 'discordPresenceClientID' is undefined or null. Please enter a valid clientID and restart the application."
                });
            }

        }
    }
}

// Change the presence.
const _changePresence = (_details, _state) => {
    if (allowPresence) {
        if (clientLoaded) {

            client.setActivity({
                details: _details,
                state: _state,
                largeImageKey: "icon",
                largeImageText: "Performance Log version 0.7.2",
                startTimestamp: new Date(),
            });
        } else {
            setTimeout(function () {
                _changePresence(obj);
            }, 1000);
        }
    }
}

module.exports = {
    initialize: _init,
    changePresence: _changePresence
}