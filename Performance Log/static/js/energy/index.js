import * as sh from './sockethandler.js';


// Connect the client to the server.
const socket = io.connect("http://localhost:8000/");

sh.listen(socket);

// Send the server a signal with some data that the client (user) has connected.
socket.emit("clientConnect", {
    page: 'index',
    time: Date.now(),
    id: socket.id,
    request: 'batteryInformation'
});

const batteryPercentageText = $g("<span> in .battery-overlay-header-percentage");
const batteryLevel = $g(".battery-level");

/**
 * Creates a infolist item.
 * @param {string} name
 * @param {string} value
 */
const createBatteryInfoListItem = (name, value) => {
    var listItem = $gcreat("div.battery-info-list-item", ".battery-info-list");

    var listItemTitle = $gcreat("div.battery-info-list-item-title", listItem);
    listItemTitle.innerHTML = `<span>${name}</span>`;

    var listItemValue = $gcreat("div.battery-info-list-item-value", listItem);
    listItemValue.innerHTML = `<span>${value}</span>`;
}

/**
 * Handle the received data from the server.
 * @param {object} data
 */
function handleBatteryData(data) {
    
    // Do stuff with the big battery.
    batteryPercentageText.innerText = data.percent + '%';
    batteryLevel.Css("height", data.percent + "%");

    // Create items for the batteryInfoList
    for (let item in data) {
        createBatteryInfoListItem(item.toUpperCase(), data[item]);
    }
}

export { handleBatteryData };