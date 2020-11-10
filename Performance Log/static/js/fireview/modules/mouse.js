/*
 *  Fireview.js © by Rohan Kanhaisingh.
 *  
 *  Mouse handlers
 *  
 *  mouse.js
 */


import { ctx, canvas } from '../index.js';


const Button = {
    Left: 0,
    Middle: 1,
    Right: 2
}

var mouse = {
    x: undefined,
    y: undefined,
    speedX: undefined,
    speedY: undefined,
    pressingLeft: false,
    pressingMiddle: false,
    pressingRight: false
};

var timestamp = null;
var lastMouseX = null;
var lastMouseY = null;

const handleMouseEvent = (target) => {
    var target, a, b, c, d;
    if (!(target instanceof HTMLElement)) {
        throw new Error("Cannot set event listeners on the given argument: " + target + "");
        return;
    }

    target.addEventListener("mousemove", (event) => {
        const e = event;
        mouse.x = event.offsetX;
        mouse.y = event.offsetY;

        if (timestamp === null) {
            timestamp = Date.now();
            lastMouseX = e.screenX;
            lastMouseY = e.screenY;
            return;
        }

        var now = Date.now();
        var dt = now - timestamp;
        var dx = e.offsetX - lastMouseX;
        var dy = e.offsetY - lastMouseY;
        mouse.speedX = Math.round(dx / dt * 100);
        mouse.speedY = Math.round(dy / dt * 100);

        timestamp = now;
        lastMouseX = e.offsetX;
        lastMouseY = e.offsetY;
    });
    target.addEventListener("mousedown", function (event) {
        switch (event.button) {
            case 0:
                mouse.pressingLeft = true;
                break;
            case 1:
                mouse.pressingMiddle = true;
                break;
            case 2:
                mouse.pressingRight = true;
                break;
        }
    });
    target.addEventListener("mouseup", function (event) {
        switch (event.button) {
            case 0:
                mouse.pressingLeft = false;
                break;
            case 1:
                mouse.pressingMiddle = false;
                break;
            case 2:
                mouse.pressingRight = false;
                break;
        }
    });
}

function MouseDown(button, callback) {
    var button, callback, a = false, b;
    if (typeof button !== 'undefined') {
        for (a in Button) {
            if (button == Button[a]) {
                a = true;
            }
        }
        if (a) {
            if (typeof callback !== 'undefined') {
                if (typeof callback == 'function') {
                    window.addEventListener("mousedown", function (event) {
                        var position = { x: event.offsetX, y: event.offsetY };
                        callback(position);
                    });
                }
            }
        } else {
            throw new Error("The given argument (as button) is not a valid button type");
            return;
        }
    } else {
        throw new Error("Can not use undefined as button");
        return;
    }
}
function MouseUp(button, callback) {
    var button, callback, a, b = false; 
    if (typeof button !== 'undefined') {
        for (a in Button) {
            if (button == Button[a]) {
                b = true;
            }
        }
        if (b) {
            if (typeof callback !== 'undefined') {
                if (typeof callback == 'function') {
                    window.addEventListener("mouseup", function (event) {
                        var position = { x: event.offsetX, y: event.offsetY };
                        callback(position);
                    });
                }
            }
        } else {
            throw new Error("The given argument (as button) is not a valid button type");
            return;
        }
    } else {
        throw new Error("Can not use undefined as button");
        return;
    }
}

function MouseHold(button, callback) {
    var button, callback, a, b = false, isPressing = false, end = true;
    if (typeof button !== 'undefined') {
        for (a in Button) {
            if (Button[a] == button) {
                b = true;
            }
        }
        if (b) {
            if (typeof callback !== 'undefined') {
                if (typeof callback == 'function') {
                    if (typeof this.parentElement !== 'undefined') {
                        this.parentElement.addEventListener("mousedown", function () {
                            if (event.button == button) {
                                isPressing = true;
                                var position = { x: event.offsetX, y: event.offsetY };
                                callback(position, end = isPressing);
                            }
                        });
                        this.parentElement.addEventListener("mouseup", function () {
                            if (event.button == button) {
                                ctx.beginPath();
                                isPressing = false;
                                var position = { x: event.offsetX, y: event.offsetY };
                                callback(position, end = !1);
                            }
                        });
                        this.parentElement.addEventListener("mousemove", function (event) {
                            if (isPressing) {
                                var position = { x: event.offsetX, y: event.offsetY };
                                callback(position);
                            }
                        });
                        this.parentElement.addEventListener("mouseout", function () {
                            isPressing = !1;
                        });
                    }
                }
            }
        } else {
            throw new Error("The given argument (as button) is not a valid button type.");
            return;
        }
    } else {
        throw new Error("Can not use undefined as button");
        return;
    }
}

const PolarDirection = function(x1, y1, x2, y2) {
    var x1, y1, x2, y2, a, b;

    a = Math.atan2(y2 - y1, x2 - x1);

    return {
        x: Math.cos(a),
        y: Math.sin(a)
    }
}

window['Button'] = Button;
window['PolarDirection'] = PolarDirection;

export { handleMouseEvent, mouse, MouseDown, MouseUp, MouseHold}