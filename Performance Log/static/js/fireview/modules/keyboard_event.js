/*
 *  Fireview.js © by Rohan Kanhaisingh.
 * 
 *  Keyboard handlers
 * 
 *  ./keyboard_events.js
 */


const fc = {
    /**
     * Listens for a key being pressed.
     * @param {(string)} key
     * @param {any} callback
     */
    pt_GetKeyDown: function (key, callback) {
        var key, callback, a, b, c, d, e, f;
        a = ['space', 'l-alt', 'r-alt', 'l-shift', 'r-shift', 'esc', 'l-ctrl', 'r-ctrl', 'arrow-up', 'arrow-down', 'arrow-right', 'arrow-left'];
        for (b in a) { if (a[b] == key) { c = !0; } }
        if (c) {
            window.addEventListener("keydown", function (event) {
                switch (key) {
                    case "space":
                        if (event.keyCode == 32) {
                            if (typeof callback !== 'undefined' && typeof callback == 'function') {
                                callback();
                            } else {
                                throw new Error("The given argument (as callback) is not a function or may not exist.");
                                return;
                            }
                        }
                        break;
                    case "l-alt":
                        if (event.keyCode == 18 && event.location == 1) {
                            if (typeof callback !== 'undefined' && typeof callback == 'function') {
                                callback();
                            } else {
                                throw new Error("The given argument (as callback) is not a function or may not exist.");
                                return;
                            }
                        }
                        break;
                    case "r-alt":
                        if (event.keyCode == 18 && event.location == 2) {
                            if (typeof callback !== 'undefined' && typeof callback == 'function') {
                                callback();
                            } else {
                                throw new Error("The given argument (as callback) is not a function or may not exist.");
                                return;
                            }
                        }
                        break;
                    case "l-shift":
                        if (event.keyCode == 16 && event.location == 1) {
                            if (typeof callback !== 'undefined' && typeof callback == 'function') {
                                callback();
                            } else {
                                throw new Error("The given argument (as callback) is not a function or may not exist.");
                                return;
                            }
                        }
                        break;
                    case "r-shift":
                        if (event.keyCode == 16 && event.location == 2) {
                            if (typeof callback !== 'undefined' && typeof callback == 'function') {
                                callback();
                            } else {
                                throw new Error("The given argument (as callback) is not a function or may not exist.");
                                return;
                            }
                        }
                        break;
                    case ("esc" || "escape"):
                        if (event.keyCode == 27) {
                            if (typeof callback !== 'undefined' && typeof callback == 'function') {
                                callback();
                            } else {
                                throw new Error("The given argument (as callback) is not a function or may not exist.");
                                return;
                            }
                        }
                        break;
                    case "l-ctrl":
                        if (event.keyCode == 17 || event.location == 1) {
                            if (typeof callback !== 'undefined' && typeof callback == 'function') {
                                callback();
                            } else {
                                throw new Error("The given argument (as callback) is not a function or may not exist.");
                                return;
                            }
                        }
                        break;
                    case "r-ctrl":
                        if (event.keyCode == 17 || event.location == 1) {
                            if (typeof callback !== 'undefined' && typeof callback == 'function') {
                                callback();
                            } else {
                                throw new Error("The given argument (as callback) is not a function or may not exist.");
                                return;
                            }
                        }
                }
            });
        } else {
            window.addEventListener("keydown", (event) => {
                if (event.key == key) {
                    if (typeof callback !== 'undefined') {
                        if (typeof callback == 'function') {
                            callback();
                        } else {
                            throw new Error("The given argument (as callback) is not a function.");
                            return;
                        }
                    } else {
                        throw new Error("Cannot use undefined as callback.");
                        return;
                    }
                }
            });
        }
    },
    pt_GetKeyUp: (key, callback) => {
        var key, callback, a, b, c, d, e, f;
        a = ['space', 'l-alt', 'r-alt', 'l-shift', 'r-shift', 'esc', 'l-ctrl', 'r-ctrl'];
        for (b in a) {
            if (a[b] == key) {
                c = !0;
            }
        }
        if (c) {

        } else {
            window.addEventListener("keyup", (event) => {
                if (event.key == key) {
                    if (typeof callback !== 'undefined') {
                        if (typeof callback == 'function') {
                            callback();
                        } else {
                            throw new Error("The given argument (as callback) is not a function.");
                            return;
                        }
                    } else {
                        throw new Error("Cannot use undefined as callback.");
                        return;
                    }
                }
            });
        }
    }
}

export { fc };