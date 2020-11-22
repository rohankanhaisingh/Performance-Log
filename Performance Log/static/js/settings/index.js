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

        $gnoti({
            Title: "$title", 
            Text: "You might restart the application for some settings. Do you want to restart the application?",
            Duration: 4000,
            Button: {
                Accept: function () {
                    socket.emit("process.exit", {});
                },
                Cancel: true
            }
        });

        socket.emit("settingChange", {
            type: _name,
            value: _value,
            time: Date.now(),
        });
    });
});

// Make the toggles active or not based on the info in the settings file
$gxhr("../user/settings.json", function (response) {
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
            else if (typeof parsedText[item] == 'string') {
                if (parsedText[item] == 'dark') {
                    element.AddClass("active");
                }
            }
        }
    }
});