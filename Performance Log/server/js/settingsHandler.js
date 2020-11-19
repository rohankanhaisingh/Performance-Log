const fs = require("fs");

let _devmode = false, _datainterval = 2000;

const s = JSON.parse(fs.readFileSync("./static/user/settings.json", 'utf-8'));

// Loop through the settings json file.
for (let item in s) {

    // Check item. This is basically a better way of using a if-statement.
    switch (item) {
        case "developerMode":
            if (typeof s[item] == 'boolean') {
                _devmode = s[item];
            } else {
                _devmode = false;
            }
            break;
        case "dataInterval":
            if (typeof s[item] == 'number') {
                _datainterval = s[item];
            } else {
                _datainterval = 1000;
            }
            break;
    }
}


// Change the settings.
function _changeSettings(data) {
    const a = fs.readFileSync("./static/user/settings.json", 'utf-8'); // Read the JSON file again cuz why not.

    // Again, the easy way of using a if-statement.
    switch (data.type) {
        case "developermode":
            // Change developerMode property and write the file.

            a.developerMode = data.value
            _write();

            break;
        case "darktheme":
            // Change darkTheme property and write the file.

            if (data.value) {
                a.theme = 'dark';
            } else {
                a.theme = 'white';
            }

            _write();
            break;
    }

    // Write the json file.
    function _write() {
        fs.writeFile("./static/user/settings.json", JSON.stringify(a), "utf-8", function (err) {
            // Logs a error if there is one.

            console.log(err);
        });
    }
}

// Export functions and properties.
module.exports = {
    developerMode: _devmode,
    dataInterval: _datainterval,
    changeSetting: _changeSettings
}