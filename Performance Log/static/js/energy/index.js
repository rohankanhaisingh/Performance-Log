import * as sh from './sockethandler.js';

var socket = io.connect("http://localhost:8000/");

sh.listen(socket);

socket.emit("clientConnect", {
    page: 'index',
    time: Date.now(),
    id: socket.id,
    request: 'batteryInformation'
});

const batteryPercentageText = $g("<span> in .battery-overlay-header-percentage");
const batteryLevel = $g(".battery-level");

function createBatteryInfoListeItem(name, value) {
    var a = $gcreat("div.battery-info-list-item", ".battery-info-list");
    var b = $gcreat("div.battery-info-list-item-title", a);
    b.innerHTML = `<span>${name}</span>`;
    var c = $gcreat("div.battery-info-list-item-value", a);
    c.innerHTML = `<span>${value}</span>`;
}

function handleBatteryData(data) {
    console.log(data);

    // Do stuff for the big battery.
    batteryPercentageText.innerText = data.percent + '%';
    batteryLevel.Css("height", data.percent + "%");

    // Create items for the batteryInfoList
    for (var a in data) {
        createBatteryInfoListeItem(a.toUpperCase(), data[a]);
    }
}

export { handleBatteryData };