const fs = require("fs");

const _get = callback => {
    let exec = require("child_process").exec, child;

    child = exec("powershell.exe ./server/ps1/getSteamApps.ps1");

    child.stdout.on("data", function (data) {
        if (typeof callback == 'function') {
            callback(data);
        } else {
            throw new Error("The given argument is not a function");
            return;
        }
    });
    child.stdin.end(); //end input
}
module.exports = {
    getAll: _get
}