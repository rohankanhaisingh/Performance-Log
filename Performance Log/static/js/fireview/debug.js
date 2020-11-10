/*
 *  Fireview.js © by Rohan Kanhaisingh.
 *  
 *  Fireview Debug
 *  
 *  ./debug.js
 * 
 */


import { graphical_objects } from './modules/objects.js';
import { FireView, canvas } from './index.js';

const Debug = {
    /**
     * Get the information about a specific property.
     * @param {("graphical_objects" | "lines")} propertyName
     */
    Get: function (propertyName) {
        var propertyName, a, b, c = false, d, e;
        a = ['graphical_objects', 'lines'];
        for (b in a) {
            if (a[b] == propertyName) {
                c = true;
            }
        }

        if (c) {
            switch (propertyName) {
                case "graphical_objects":
                    d = {
                        length: graphical_objects.length,
                        type: typeof graphical_objects,
                        clear: function () {
                            var i = 0, a = graphical_objects.length;
                            for (var b = 0; b < a; b++) {
                                graphical_objects.splice(b, 1);
                            }
                        },
                        filter: function (property, value) {
                            var property, value, f, h, i, j;
                            if (typeof property !== 'undefined' && typeof value !== 'undefined') {
                                f = [];
                                for (var i = 0; i < graphical_objects.length; i++) {
                                    if (typeof graphical_objects[i][property] !== 'undefined') {
                                        if (graphical_objects[i][property] == value) {
                                            f.push(graphical_objects[i]);
                                        }
                                    }
                                }
                                return f;
                            }
                        }
                    };
                    return d;
                    break;
            }
        } else {
            if (typeof propertyName == 'undefined') {
                throw new Error("Boiiii enter something :/");
                return;
            } else {
                throw new Error(`The given value (as propertyName) is not valid`);
                return;
            }
        }
    },
    /**
     * Adds the object to window.
    */
    SetDebugInConsole: function () {
        if (typeof window['FireviewDebug'] == 'undefined') { // Check if the window object has a FireViewDebug object.
            window["FireviewDebug"] = this;
        } else {
            return "This object has already been part of the console.";
        }
    },
    Create: function (canvasName, objectName, objectProperties) {
        console.log(canvas);
    }
}


export { Debug };