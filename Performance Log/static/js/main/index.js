import { FireView } from '../fireview/index.js';
import * as sh from './sockethandler.js';
import { CanvasContext } from './canvascontext.js';

var socket = io.connect("http://localhost:8000/");

sh.listen(socket);

socket.emit("clientConnect", {
    page: 'index',
    time: Date.now(),
    id: socket.id,
    request: 'systemInformation'
});



const CpuContext = new CanvasContext(document.querySelector(".fluid-cpu canvas"), document.querySelector(".fluid-cpu .fluid-grid-col-canvas-overlay-title span"));
const RamContext = new CanvasContext(document.querySelector(".fluid-ram canvas"), document.querySelector(".fluid-ram .fluid-grid-col-canvas-overlay-title span"));
const DiskContext = new CanvasContext(document.querySelector(".fluid-disk canvas"), document.querySelector(".fluid-disk .fluid-grid-col-canvas-overlay-title span"));

/**
 * Creates a model-info item.
 * @param {string} name
 * @param {any} value
 * @param {HTMLDivElement} returnElement
 */
function createModelInformationItem(name, value, returnElement) {
    var name, value, returnElement;

    var a = g.CreateElement("div.fluid-grid-col-modelinfo-item", returnElement);
    var b = g.CreateElement("div.fluid-grid-col-modelinfo-item-title", a);
    b.innerHTML = `<span>${name.toUpperCase()}</span>`;
    var c = g.CreateElement("div.fluid-grid-col-modelinfo-item-value", a);
    c.innerHTML = `<span>${value}</span>`;

}

/**
 * Handle the received hardware information data.
 * @param {any} data
 */
function handleInitializedData(data) {
    console.log(data);
    for (var a in data.cpu[0]) {
        if (typeof data.cpu[0][a] !== 'object') {
            createModelInformationItem(a, data.cpu[0][a], $g(".cpu-modelinfo"));
        }
    }
    for (var a in data.ram[1]) {
        createModelInformationItem(a, data.ram[1][a], $g(".ram-modelinfo"));
    }
    for (var a in data.ram[0][0]) {
        createModelInformationItem(a, data.ram[0][0][a], $g(".ram-modelinfo"));
    }
    for (var a in data.disk[1][0]) {
        createModelInformationItem(a, data.disk[1][0][a], $g(".disk-modelinfo"));
    }
    for (var a in data.disk[0][0]) {
        createModelInformationItem(a, data.disk[0][0][a], $g(".disk-modelinfo"));
    } 

    $g("<span> in .model-cpu").innerText = data.cpu[0].brand;
    $g("<span> in .model-disk").innerText = data.disk[0][0].name;
}

function handleUpdatedData(d) {
    switch (d.type) {
        case "cpu":
            var usage = 360 / 100 * ((d.data[0] * 100) + 6);
            CpuContext.update(usage, Math.round((d.data[0] * 100) + 6));
            break;
        case "ram":
            var usage = 100 / d.data[0].total * d.data[0].used;

            RamContext.update(360 / 100 * usage, Math.round(usage));
            break;
        case "disk":
            DiskContext.update(360 / 100 * Math.round(d.data[1][0].use), Math.round(d.data[1][0].use));
            break;
    }
}



// Export functions from this file to other modules.

export { handleInitializedData, handleUpdatedData };