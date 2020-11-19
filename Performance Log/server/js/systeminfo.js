/*
 *  Ehhhh yeah I am too lazy to explain what this script does. 
 *  Basically, this document has many object with function to receive (with initializing) hardware information.
 *  A function (callback) will be called when the information for a specific hardware unit has been received.
 * 
 */

const si = require("systeminformation");
const os = require("os");
const cpuStat = require("cpu-stat");
const osu = require("os-utils");

var _events = {
    onLoaded: undefined
}

const _cpu = {
    initialize: function (callback) {
        si.cpu(function (a) {
            osu.cpuUsage(function (b) {
                if (typeof callback !== 'undefined' && typeof callback == 'function') {
                    callback([a, { usage: b}]);
                }
            });
        });
    },
    update: function (callback) {
        osu.cpuUsage(function (b) {
            if (typeof callback !== 'undefined' && typeof callback == 'function') {
                callback([b]);
            }
        });
    }
}

const _ram = {
    initialize: function (callback) {
        si.memLayout().then(function (a) {
            si.mem().then(function (b) {
                if (typeof callback !== 'undefined' && typeof callback == 'function') {
                    callback([a, b]);
                }
            });
        });
    },
    update: function(callback) {
        si.mem().then(function (b) {
            if (typeof callback !== 'undefined' && typeof callback == 'function') {
                callback([b]);
            }
        });
    }
}

const _disk = {
    intialize: function (callback) {
        si.diskLayout().then(function (a) {
            si.fsSize().then(function (b) {
                if (typeof callback == 'function') {
                    callback([a, b]);
                }
            });;
        });
    }
}

const _battery = {
    initialize: function (callback) {
        si.battery().then(function (data) {
            if (typeof callback == 'function') {
                callback(data);
            }
        });
    },
    update: function (callback) {

    }
}

const _all = {
    initialize: function (callback) {
        /*
         * Okay this looks complicated and it kinda is. This will call 3 functions to receive all information so far. The number a will increase whenever 
         * the function has been called and also when the information got received. It will also call a other function to check if all the needed information has been received.
         * If the number a is equal to 3, then it will call a function.
         * 
         * Yes sorry this sounds weird and it is, kinda. It works really good so yeah.
        */

        if (typeof callback !== 'undefined') {
            var a = 0, b = {}, c, d, e;

            d = function () {
                if (a == 3) {
                    callback(b);
                    if (typeof _events.onLoaded !== 'undefined' && typeof _events.onLoaded == 'function') {
                        _events.onLoaded();
                    }
                }
            }

            c = function () {
                a += 1;
                d();
            }

            // Initialize for all units

            _cpu.initialize(function (data) {
                b.cpu = data;
                c();
            });
            _ram.initialize(function (data) {
                b.ram = data;
                c();
            });
            _disk.intialize(function (data) {
                b.disk = data;
                c();
            });         
        }
    }
}

module.exports = {
    cpu: _cpu,
    ram: _ram,
    disk: _disk,
    all: _all,
    battery: _battery
}