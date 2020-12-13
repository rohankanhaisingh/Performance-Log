import * as sh from './sockethandler.js';
import { ModelCard } from './models/card.js';
import * as msh from './modelScrollerHandler.js';
import * as inputHandler from './inputHandler.js';

// Connect to the server
const socket = io.connect("http://localhost:8000/");

// Start listening for events when the client (user) got connected to the server.
sh.listen(socket);

// Give the server a sign that the client (user) got connected.
socket.emit("clientConnect", {
    page: 'games',
    time: Date.now(),
    id: socket.id,
    request: "games"
});

// Handle the scroller container in the webpage.
msh.handle($g(".models-scroller"));

inputHandler.handle($g(".games-model-filter-inputfield"));

// Handle the received apps from the server.
const handleSteamApps = (data, name) => {

    // Create a new XMLHttpRequest object.
    let xhr = new XMLHttpRequest();

    // Onreadystate event listener for the xhr object.
    xhr.onreadystatechange = function () {

        // If the xhr is complete loading.
        if (this.readyState == 4) {

            // If the status is equal to 200.
            if (this.status == 200) {

                // Parse the received string into a JSON object.
                let parsedText = JSON.parse(this.responseText);

                if (typeof parsedText[data.id] !== 'undefined') {

                    // The variable 'data' is already used, so I am using 'd' as a new variable.
                    let d = parsedText[data.id];

                    let parsedDate = new Date(parseFloat(data.lastEdited.substring(data.lastEdited.indexOf("(") + 1, data.lastEdited.indexOf(")"))));

                    let time = `${parsedDate.getDate()}-${parsedDate.getMonth() + 1}-${parsedDate.getFullYear()} ${parsedDate.getHours()}:${parsedDate.getMinutes()}`;

                    // Creates a new card.
                    let card = new ModelCard(name, null, time, d.imageHeader, {
                        path: "steam://rungameid/" + data.id
                    });
                } else {
                    let card = new ModelCard(name, null, time, "https://www.want.nl/wp-content/uploads/2019/09/Steam-2.jpg", {
                        path: "steam://rungameid/" + data.id
                    });
                }
            }
        }
    }

    // Open the json file.
    xhr.open("get", "../user/steamApps.json");
    xhr.send(null); // Won't send any header.
}

export { socket, handleSteamApps };