const fs = require("fs");

var _devmode = false, _datainterval = 2000;

var s = JSON.parse(fs.readFileSync("./static/user/settings.json", 'utf-8'));

for (var a in s) {
    switch (a) {
        case "developerMode":
            if (typeof s[a] == 'boolean') {
                _devmode = s[a];
            } else {
                _devmode = false;
            }
            break;
        case "dataInterval":
            if (typeof s[a] == 'number') {
                _datainterval = s[a];
            } else {
                _datainterval = 1000;
            }
            break;
    }
}

function _changeSetting(data) {
    var data, a = JSON.parse(fs.readFileSync("./static/user/settings.json", 'utf-8'));

    switch (data.type) {
        case "developermode":
            a.developerMode = data.value;
            _write();
            break;
        case "darktheme":
            if (data.value) {
                a.theme = 'dark';
            } else {
                a.theme = 'white';
            }
            _write();
            break;
    }

    function _write() {
        fs.writeFile("./static/user/settings.json", JSON.stringify(a), "utf-8", function (err) {
            console.log(err);
        });

    }
}


module.exports = {
    developerMode: _devmode,
    dataInterval: _datainterval,
    changeSetting: _changeSetting
}