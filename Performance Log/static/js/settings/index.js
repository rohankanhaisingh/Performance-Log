import * as sh from './sockethandler.js';

const socket = io.connect("http://localhost:8000/");

sh.listen(socket);

socket.emit("clientConnect", {
    page: 'index',
    time: Date.now(),
    id: socket.id,
});

// Make the toggles interactive

const toggles = $ga(".settings-item-toggle");
const inputFields = $ga(".settings-section-item-input");

toggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
        var _value = eval(this.getAttribute("toggle-value"));
        var _name = this.getAttribute("toggle-name");

        if (this.classList.contains("active")) {
            this.classList.remove("active");
            _value = false;
        } else {
            _value = true;
            this.classList.add("active");
        }

        new WebNotification("Performance Log", "Settings", "You may have to restart this application in order to experience the changes you have made. Do you want to restart this application", "../icons/bruh.jpeg", 10000).On("click", function () {
            socket.emit("process.exit", {});
        });

        socket.emit("settingChange", {
            type: _name,
            value: _value,
            time: Date.now(),
        });
    });
});

inputFields.forEach(function (input) {
    input.addEventListener("keyup", function () {
        let val = this.innerText;
        let name = this.getAttribute("input-name");

        if (val !== "") {
            socket.emit("settingChange", {
                type: name,
                value: val,
                time: Date.now(),
            });
        } else {
            socket.emit("settingChange", {
                type: name,
                value: null,
                time: Date.now(),
            });
        }
    });
});

// Make the toggles active or not based on the info in the settings file
g.XHLoad("../user/settings.json", function (response) {
    let parsedText = JSON.parse(response.text);
    let element;

    for (let item in parsedText) {

        // Get the element.
        element = $g("." + item);

        if (typeof element !== 'undefined') {
            if (typeof parsedText[item] == 'boolean') {
                if (parsedText[item]) {
                    element.AddClass("active");
                }
            }
        }

        switch (item) {
            case "theme":
                if (parsedText[item] == 'dark') {
                    element.AddClass("active");
                }
                break;
            case "discordPresenceClientID":
                if (parsedText[item] !== null) {
                    element.innerText = parsedText[item];
                }
                break;
        }
    }
});