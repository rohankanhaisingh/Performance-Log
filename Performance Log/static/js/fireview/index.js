/*
 * Fireview by Rohan Kanhaisingh.  
 * 
 * Fireview is a graphical library for websites. This library makes it easier for developers to create graphics. Fireview is free to use
 * and it's still under development. As owner of this library (Rohan Kanhaisingh), I'd love to see people using this library :D.
 * 
 * Fireview includes files (modules) that requires in order to make this library work. Please contact the owner of Fireview (Rohan Kanhaising) 
 * if you are missing files or if something doesn't work. 
 * 
 * Visit https://instagram.com/rohankanhaisingh or https://github.com/rohankanhaisingh for contact.
*/ 


// Importing modules


import { add, graphical_objects, pt_Group } from './modules/objects.js';
import * as mouseHandler from './modules/mouse.js';
import { fc } from './modules/keyboard_event.js';

// Shapes and drawing stuff
import { pt_Draw } from './modules/draw.js';
import { pt_Square, pt_Square_trails } from './modules/shapes/square.js';
import { pt_Circle } from './modules/shapes/circle.js';
import { pt_Blob } from './modules/shapes/blob.js';
import { pt_CustomShape } from './modules/shapes/customShape.js';
import { pt_Rectangle } from './modules/shapes/rectangle.js';

// Effects
import { pt_Particle } from './modules/effects/particle.js';
import { pt_LightSource } from './modules/effects/lightsource.js';

// Audio
import { pt_Audio } from './modules/audio/index.js';
import { setUniqueID } from './modules/uniqueID.js';

// Private variables.

var canvas, ctx, background = { type: undefined, value: undefined }, times = [], fps = void 0, maxfps = void 0, currentFPS = void 0;;

/**
 * Returns a number between 2 values.
 * @param {number} number1 
 * @param {number} number2
 */
const RandomBetween = function (number1, number2) {
    var number1, number2;
    switch (number1 + number2) {
        case undefined:
            return undefined;
            break;
        default:
            return Math.floor(Math.random() * (number2 - number1 + 1) + number1);
    }
}

const FireView = {
    Audio: pt_Audio,
    GetKeyDown: fc.pt_GetKeyDown,
    GetKeyUp: fc.pt_GetKeyUp,
    Group: pt_Group,
    FPSMeter: class FPSMeter {
        /**
         * Creates a new FPS meter that will measure the FPS of the current running canvas. 
        */
        constructor() {

            var a = document.createElement("div"); a.className = 'fireview-fpsmeter'; document.body.appendChild(a);
            var b = document.createElement("div"); b.className = "fpsmeter-container"; a.appendChild(b);
            var c = document.createElement("div"); c.className = 'fpsmeter-container-indicators'; b.appendChild(c);

            var fpsIndicator = document.createElement("div"); fpsIndicator.className = 'fpsmeter-container-indicator'; c.appendChild(fpsIndicator);
            this.fpsIndicatorVisual = document.createElement("div"); this.fpsIndicatorVisual.className = 'indicator-visual'; fpsIndicator.appendChild(this.fpsIndicatorVisual);

            var fpsText = document.createElement("div"); fpsText.className = 'fpsmeter-container-text'; b.appendChild(fpsText);
            this.fpsTextMain = document.createElement("span"); fpsText.appendChild(this.fpsTextMain);

            graphical_objects.push(this);
        }
        update() {
            const e = performance.now();
            for (; times.length > 0 && times[0] <= e - 1e3;) times.shift();
            times.push(e), fps = times.length;

            var d = 100 / maxfps * fps;
            currentFPS = fps;

            this.fpsTextMain.innerText = `${fps} FPS | ${maxfps} FPS`;
            this.fpsIndicatorVisual.style.width = `${d}%`;
        }

    },
    Canvas: class Canvas {
        /**
         * Create a canvas where the graphics will be shown.
         * @param {(number) | "full"} width
         * @param {(number) | "full"} height
         * @param {HTMLElement} parentElement The element where the canvas will be placed.
         * @param {string} name
         */
        constructor(width, height, parentElement, name) {
            this.width = width;
            this.height = height;
            this.parentElement = parentElement;
            this.canvasElement;
            this.name = name;

            // Logic
            if (typeof width !== 'number' && width !== 'full') {
                throw new Error("The given argument (as width) is not a integer. Use .ToInt() or .ToFloat() to convert a string into a integer or a float.");
                return;
            }
            else if (typeof height !== 'number' && height !== 'full') {
                throw new Error("The given argument (as height) is not a interger. Use .ToInt() or .ToFloat() to convert a string into a integer or a float.");
                return;
            }
            else if (!(parentElement instanceof HTMLElement)) {
                throw new Error("The given argument (as parentElement) is not a HTML element.");
                return;
            }
            switch (width, height) {
                case 'full':
                    this.width = window.innerWidth;
                    this.height = window.innerHeight;
                    break;
            }

            // Process
            var a = document.createElement("canvas");
            a.width = this.width;
            a.height = this.height;
            a.setAttribute("fireview-canvas-name", this.name);

            this.canvasElement = a;
            canvas = a;
            ctx = a.getContext("2d");

            mouseHandler.handleMouseEvent(a);

            this.parentElement.appendChild(a);
            this.Default2DContext = ctx;

            this.backgroundImage;
        }
        /**
         * 
         * @param {"color" | "image" | "linearGradient"} type
         * @param {any} value
         */
        SetBackground(type, value) {
            var a, b, c, d, e;
            switch (type) {
                case 'color':
                    background.type = 'color';
                    background.value = value;
                    break;
                case "image":
                    if (typeof value !== 'undefined') {
                        a = new Image();
                        a.src = value;
                        a.onload = () => {
                            this.backgroundImage = a;
                            background.type = 'image';
                        }
                    } else {
                        throw new Error("Cannot use undefined as image source.");
                        return;
                    }
                    break;
                default:
                    throw new Error(`${type} is not a valid type. Please use 'color', 'image' or 'linearGradient' as type`);
                    return;
                    break;
            }
        }
        /**
         * Lock the size of the canvas to the browser size, even when resizing.
        */
        LockToWindowSize() {
            window.addEventListener("resize", () => {
                this.canvasElement.width = window.innerWidth;
                this.canvasElement.height = window.innerHeight;
            });
        }
        /**
         * Disables the context menu when right-clicking. 
        */
        DisableContextMenu() {
            if (typeof this.canvasElement !== 'undefined') {
                this.canvasElement.addEventListener("contextmenu", (event) => {
                    event.preventDefault();
                    return;
                });
            }
        }

        Draw = pt_Draw;
        Default2DContext = ctx;
        Circle = pt_Circle;
        Square = pt_Square;
        MouseDown = mouseHandler.MouseDown;
        MouseUp = mouseHandler.MouseUp;
        MouseHold = mouseHandler.MouseHold;
        Rectangle = pt_Rectangle;
        Particle = pt_Particle;
        LightSource = pt_LightSource;
        Blob = pt_Blob;
        CustomShape = pt_CustomShape;
    },
    /**
     * 
     * @param {object} target Canvas that will be updated.
     * @param {(number) | "sync"} fps Amount of frames that will show per second.
     * @param {boolean} clearEachFrame Clear each frame.
     */
    Update: function (target, fps, clearEachFrame) {
        var a, b, c, d, e, interval, target, fps, clearEachFrame = false;
        if (typeof target !== 'undefined') {
            if (typeof target.canvasElement !== 'undefined') {
                if (fps == 'sync') {
                    d = function () {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        switch (background.type) {
                            case "color":
                                ctx.beginPath();
                                ctx.rect(0, 0, canvas.width, canvas.height);
                                ctx.fillStyle = background.value;
                                ctx.fill();
                                break;
                            case "image":
                                if (typeof target.backgroundImage !== 'undefined') {
                                    if (target.backgroundImage instanceof HTMLImageElement) {
                                        ctx.save();
                                        ctx.beginPath();
                                        ctx.drawImage(target.backgroundImage, 0, 0, target.canvasElement.width, target.canvasElement.height);
                                        ctx.restore();
                                    }
                                }
                                break;
                        }

                        graphical_objects.forEach((obj) => {
                            if (typeof obj.update !== 'undefined') {
                                obj.update(null);
                            }
                        });

                        pt_Square_trails.forEach((obj) => {
                            if (typeof obj.update !== 'undefined') {
                                obj.update();
                            }
                        });

                        if (typeof FireView.FixedUpdate !== 'undefined') {
                            if (typeof FireView.FixedUpdate == 'function') {
                                FireView.FixedUpdate();
                            }
                        }

                        maxfps = currentFPS;
                        c = window.requestAnimationFrame(d);
                    }
                    d();
                } else {
                    a = () => {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        switch (background.type) {
                            case "color":
                                ctx.beginPath();
                                ctx.rect(0, 0, canvas.width, canvas.height);
                                ctx.fillStyle = background.value;
                                ctx.fill();
                        }

                        graphical_objects.forEach((obj) => {
                            if (typeof obj.update !== 'undefined') {
                                obj.update(null);
                            }
                        });

                        pt_Square_trails.forEach((obj) => {
                            if (typeof obj.update !== 'undefined') {
                                obj.update();
                            }
                        });

                        maxfps = fps;
                        interval = setTimeout(a, 1000 / fps);
                    }
                    a();
                }
            } else {
                throw new Error('The given object (as target) has no canvasElement property');
                return;
            }
        } else {
            throw new Error("The given argument (as target) is undefined. Please enter a valid target");
            return;
        }
    }
}

/**
 * Imports a file into FireView.
 * @param {("shape" | "image" | "mesh" | "config")} type
 * @param {string} path
 */
const Import = function (type, path) {
    var type, path;
    switch (type) {
        case "config":
            var a = new XMLHttpRequest();
            a.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        console.log(this.response);
                    }
                }
            }
            a.open("GET", path);
            a.send(null);
            break;
    }
} 

class Color {
    /**
     * 
     * @param {string} value
     */
    constructor(value) {
        this.hex;
        this.rgb;
        this.hlsa;

        if (typeof value == 'string') {
            if (value.substring(0, 1) == '#') { // Is hex
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
                const a = result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16),
                    ToString: function () {
                        return `rgb(${this.r}, ${this.g}, ${this.b})`;
                    }
                } : null;
                this.rgb = a;
            }
        }
    }
}

const Canvas = FireView.Canvas;

class Loop {
    constructor(func) {
        this.func = func;

        this.id = setUniqueID(18);
        this.type = '.LOOP_FUNC';

        graphical_objects.push(this);
    }
    update() {
        if (typeof this.func == 'function') {
            this.func();
        }
    }
    Destroy() {
        for (let i = 0; i < graphical_objects.length; i++) {
            if (typeof graphical_objects[i].type !== 'undefined') {
                if (graphical_objects[i].type == '.LOOP_FUNC') {
                    if (graphical_objects[i].id == this.id) {
                        graphical_objects.splice(i, 1);
                    }
                }
            }
        }
    }
}

export { FireView, RandomBetween, ctx, canvas, Import, Color, Loop, Canvas };