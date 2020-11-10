/**
 *  Fireview.js © by Rohan Kanhaisingh.
 * 
 *  Square
 *  
 *  ./shapes/square.js
 */

import { canvas, ctx, FireView } from '../../index.js';
import { mouse } from '../mouse.js';
import { graphical_objects, pt_Group } from '../objects.js';
import { lines } from '../draw.js';
import { setUniqueID } from '../uniqueID.js';

var errlist = [];

var pt_Square_trails = [];
var images = {};

window.getImages = function () {
    console.log(images);
}

class pt_Square {
    /**
     * Creates a new square.
     * @param {number} x Start x position.
     * @param {number} y Start y position.
     * @param {number} size Size of the square.
     * @param {object} style Style object.
     * @param style.fillStyle Sets the background color.
     * @param style.strokeStyle Sets the border color.
     * @param style.lineWidth Sets the border width.
     */
    constructor(x, y, size, style = {}) {
        this.x = x;
        this.y = y;
        this.Size = size;
        this.Style = style;
        this.Move = {x: 0, y: 0, DecreaseSpeed: 0.1}
        this.lastPosition = { x: undefined, y: undefined };

        // Image
        this.image;
        this.imageLoaded = false;

        // Gravity 
        this.yTick = 0;
        this.hasTouchedGround = false;
        this.bounceBack = 0;

        // Booleans
        this.isDragging = false;
        this.isOnGround = false;

        // Logic
        if (typeof x !== 'number') {
            throw new Error("The given argument (as x) is not a integer. If you entered a string, please convert it with .ToInt() or. .ToFloat()");
            return;
        }
        else if (typeof y !== 'number') {
            throw new Error("The given argument (as y) is not a integer. If you entered a string, please convert it with .ToInt() or. .ToFloat()");
            return;
        }
        else if (typeof y !== 'number') {
            throw new Error("The given argument (as size) is not a integer. If you entered a string, please convert it with .ToInt() or .ToFloat()");
            return;
        }

        this.Style.lineWidth = 1;

        // Other epic things
        this.Gravity = { Active: false, Force: 0 };
        this.Collider = false;
        this.ColliderTrigger = { Active: false, Callback: undefined };

        // For events
        this.hasEvent = false;
        this.hasMoveEventListener = true;

        // Unique identity.
        this.id = setUniqueID(18);
        this.type = "SHAPE_SQUARE";

        this.lightCollider = true;

        if (typeof this.Style.image !== 'undefined') {
            if (typeof images[this.Style.image.id] == 'undefined') {
                var image = document.createElement("img");
                image.src = this.Style.image.src;
                images[this.Style.image.id] = image;
            }
        }

        // Push the object to the go array.
        graphical_objects.push(this);
    }
    // Private but accessible methods
    draw() {
        if (typeof this.Style.image !== 'undefined') {
            if (typeof images[this.Style.image.id] !== 'undefined') {
                ctx.beginPath();
                ctx.drawImage(images[this.Style.image.id], this.x, this.y, this.Size, this.Size);
            }
        } else {
            ctx.save();
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.Size, this.Size);
            ctx.lineWidth = this.Style.lineWidth;

            for (var a in this.Style) {
                ctx[a] = this.Style[a];
            }
            if (typeof this.Style.strokeStyle !== 'undefined') ctx.stroke();

         
            ctx.fill();
            ctx.restore();
        }

    }
    update() {

        if (this.Gravity.Active) { // If the gravity is active.
            if (!this.isDragging) {
                if ((this.y <= canvas.height - (this.Size + 1))) {
                    this.Move.y += this.Gravity.Force;
                    if (!this.hasTouchedGround) {
                        this.yTick += 1;
                    }
                } else {
                    this.y = canvas.height - this.Size;
                    if (!this.hasTouchedGround) {
                        this.hasTouchedGround = true;

                        if (this.yTick > 70) {
                            this.bounceBack = 70;
                        } else {
                            this.bounceBack = this.yTick;
                        }
                    }

                    else if (this.bounceBack > 0) {
                        this.Move.y = -(this.bounceBack);
                        this.bounceBack -= this.Gravity.Force * (this.Size / 5);
                    }

                    // Reset properties
                    else if ((this.bounceBack < 1)) {
                        this.bounceBack = 0;
                        this.yTick = 0;
                    }
                }


                if (this.Move.x > (this.Gravity.Force / 10)) {
                    this.Move.x -= this.Gravity.Force / 10;
                }
                else if (this.Move.x < 0) {
                    this.Move.x += this.Gravity.Force / 10;
                }

                // Collide to the edges
                if (this.Collider) {
                    if (this.x >= canvas.width - this.Size) {
                        this.x = canvas.width - this.Size;
                        this.Move.x = -this.Move.x / 5;

                        if (this.bounceBack > 10) {
                            this.bounceBack -= (this.Size / 7);
                        }
                    }
                    else if (this.x <= 0) {
                        this.x = 0;
                        this.Move.x = 10;
                        if (this.bounceBack > 10) {
                            this.bounceBack -= (this.Size / 7);
                        }
                    }
                }

                if (this.y > canvas.height) {
                    this.y = canvas.height - this.Size;
                }

                this.x += this.Move.x;
                this.y += this.Move.y;
            }
        } 

        // Handle default movement.
        if (!this.Gravity.Active) { // If the gravity is not active

            if (this.Move.x >= 0) {
                this.Move.x -= this.Move.DecreaseSpeed;
            }
            if (this.Move.x <= 0) {
                this.Move.x += this.Move.DecreaseSpeed;
            }
            if (this.Move.y >= 0) {
                this.Move.y -= this.Move.DecreaseSpeed;
            }
            if (this.Move.y <= 0) {
                this.Move.y += this.Move.DecreaseSpeed;
            }

            if (this.Collider) { // Collide to the edges
                if (this.x > canvas.width - this.Size) {
                    this.x = canvas.width - this.Size;
                    this.Move.x = 0;
                } else if (this.x < 0) {
                    this.x = 0;
                    this.Move.x = 0;
                } else if (this.y > canvas.height - this.Size) {
                    this.y = canvas.height - this.Size;
                    this.Move.y = 0;
                } else if (this.y < 0) {
                    this.y = 0;
                    this.Move.y = 0;
                }
            }

            this.x += this.Move.x;
            this.y += this.Move.y;
        }

        if (this.Collider) {
            if (lines.length > 0) {
                for (var i = 0; i < lines.length; i++) {
                    if ((lines[i].x > this.x - 5 && lines[i].x < this.x + this.Size + 5) && (lines[i].y > this.y && lines[i].y < this.y + this.Size)) {
                        if (this.Move.y > 0) {
                            lines[i].y = this.y + this.Size;
                            lines[i].moveY = (this.Move.y / 2);

                            if (this.bounceBack > 0) {
                                this.bounceBack -= lines[i].style.width;
                            }

                            else if (this.Move.y > (this.Gravity.Force / 10)) {
                                this.Move.y -= (lines[i].style.width / this.Size);
                            } else {
                                this.Move.y = 0;
                                this.bounceBack = 0;
                                this.yTick = 0;
                                this.hasTouchedGround = true;
                                this.Gravity.Active = false;
                            }
                        }
                    }
                }
            }

            for (let i = 0; i < graphical_objects.length; i++) {
                if (graphical_objects[i].id !== this.id) {
                    if (this.x < graphical_objects[i].x) {
                        if (graphical_objects[i].x > this.x - this.Size && graphical_objects[i].x < this.x + this.Size) {
                            graphical_objects[i].x = this.x + this.Size;
                        }
                    }
                    if (this.x > graphical_objects[i].x) {
                        if (graphical_objects[i].x > this.x - this.Size && graphical_objects[i].x < this.x + this.Size) {
                            graphical_objects[i].x = this.x - this.Size;
                            console.log(true);
                        }
                    }
                }
            }
        }

        if (typeof this.trailProperties !== 'undefined') {
            if (this.trailProperties.active == true) {
                pt_Square_trails.push(new pt_Square_trail(this.trailProperties, { x: this.x, y: this.y }, this.trailProperties.size));
            }
        }

        if (this.Move.x !== 0 || this.Move.y !== 0) {
            if (this.hasMoveEventListener) {
                if (typeof this.moveListenerFunction == 'function') {
                    this.moveListenerFunction(self = this);
                }
            }
        }   
        this.draw();
    }

    /**
     * @class
     * @param {any} obj
     */
    Trail(obj) {
        var obj, a = {}, b, c, d, e, f;
        /** @member {Object} */
        a = {
            active: Boolean(true),
            type: undefined,
            size: undefined,
            fadingSpeed: 0,
            color: 0
        }

        for (b in obj) {
            a[b] = obj[b];
        }

        switch (a.size) {
            case "auto":
                a.size = this.Size;
                break;
        }

        this.trailProperties = a;

        return this;
    }

    // Public methods
    Drag(target) {
        var target, a = false, b = {}, c, d;
        if (typeof target !== 'undefined') {
            if (typeof target.canvasElement !== 'undefined') {
                if ((target.canvasElement instanceof HTMLCanvasElement)) {
                    target.canvasElement.addEventListener("mousedown", (event) => {
                        if (event.button == 0) {
                            if (typeof mouse !== 'undefined') {
                                if ((mouse.x >= this.x && mouse.x <= this.x + this.Size) && (mouse.y >= this.y && mouse.y <= this.y + this.Size)) {
                                    a = true;
                                    b.x = mouse.x - this.x;
                                    b.y = mouse.y - this.y;

                                    this.isDragging = true;
                                    this.Move.y = 0;
                                    this.Move.x = 0;
                                    this.yTick = 0;
                                }
                            }
                        }
                    });
                    target.canvasElement.addEventListener("mouseup", () => {
                        a = false;
                        this.isDragging = false;
                        this.lastPosition.x = event.offsetX;
                        this.lastPosition.y = event.offsetY;
                        if (this.Gravity.Active) {
                            if ((mouse.x >= this.x && mouse.x <= this.x + this.Size) && (mouse.y >= this.y && mouse.y <= this.y + this.Size)) {
                                this.Move.x = mouse.speedX / 10;
                                this.Move.y = mouse.speedY / 10;
                                this.yTick = 0;
                                this.hasTouchedGround = false;
                            }
                        }
                    });
                    target.canvasElement.addEventListener("mousemove", () => {
                        if (a) {
                            this.x = mouse.x - b.x;
                            this.y = mouse.y - b.y;
                        }
                    });

                    return this;
                } else {
                    throw new Error('The canvasElement property is not a canvas element');
                    return;
                }
            } else {
                throw new Error(`The given argument (${target}) has no canvasElement property.`);
                return;
            }
        } else {
            throw new Error("The given argument (as targtet) is undefined.");
            return;
        }
    }

    Rotate(angle) {
        var a, b, c, d, e, angle;
       
    }

    /**
     * Create a event listener on the box
     * @param {("hit.all_edges" | "hit.edge_top" | "hit.edge_bottom" | "hit.edge_right" | "hit.edge.left" | "colorchange" | "sizechange" | "movespeedchange" | "directionchange" | "drag" | "mouseover" | "mouseout" | 'move')} event
     * @param {function} func
     */
    On(event, func) {
        var event, func, events, a = false, b, c, d, e, f;

        events = ["hit.all_edges", "hit.edge_top", "hit.edge_bottom", "hit.edge_right", "hit.edge.left", "colorchange", "sizechange", "movespeedchange", "directionchange", "drag", "mouseover", "mouseout", 'move'];

        for (var h in events) if (events[h] == event) a = true; 

        if (a) {
            switch (event) {
                case "move":
                    if (typeof func !== 'undefined') {
                        this.hasMoveEventListener = true;
                        this.moveListenerFunction = func;
                    } else {
                        throw new Error('The given argument (as function) is not a function or may not exist.');
                        return;
                    }
                    break;
                case "hit.all_edges":
                    var interval, ticks, hasTriggered = false;

                    this.hasEvent = true;

                    var u = () => {
                        if ((this.x > canvas.width - this.Size || this.x < 0) || (this.y > canvas.height - this.Size || this.y < 0)) {
                            if (!hasTriggered) {
                                hasTriggered = true;
                                if (typeof func !== 'undefined' && typeof func == 'function') {
                                    func(self = this);
                                    interval = undefined;
                                    this.hasEvent = false;
                                } else {
                                    throw new Error('The given argument (as function) is not a function or may not exist.');
                                    return;
                                    interval = undefined;
                                    this.hasEvent = false;
                                }
                            }
                        } else {
                            if (this.hasEvent) {
                                interval = setTimeout(u, 1000 / 60);
                                ticks += 1;
                            }
                        }
                    };

                    u(null);
            }
        } else {
            throw new Error(`${event} is not a valid event.`);
            return;
        }
    }
    Die() {
        for (let i = 0; i < graphical_objects.length; i++) {
            if (typeof graphical_objects[i].id !== 'undefined') {
                if (graphical_objects[i].id == this.id) {
                    graphical_objects.splice(i, 1);
                }
            } 
        }
    }
    AddToGroup(group) {
        if (typeof group !== 'undefined') {
            if (group instanceof pt_Group) {
                group.AddItem("shape", this);
                return this;
            } else {
                throw new Error("The given argument is not a instance of a group.");
                return;
            }
        } else {
            throw new Error("There no given parameters. Please specify a group as parameter.");
            return;
        }
    }
    Animate(obj) {
        this.Move.x = 10;
    }
}

class pt_Square_trail {
    constructor(obj, pos, size) {
        this.obj = obj;
        this.pos = pos;
        this.size = size;
        this.startSize = size;

        // Change properties after initializing.
    }
    draw() {
        switch (this.obj.type) {
            case "border":
                ctx.beginPath();
                ctx.rect(this.pos.x + (this.startSize / 2) - (this.size / 2), this.pos.y + (this.startSize / 2) - (this.size / 2), this.size, this.size);
                ctx.strokeStyle = this.obj.color;
                ctx.stroke();
                ctx.closePath();
        }
    }
    update() {

        if (this.size > this.obj.fadingSpeed) {
            this.size -= this.obj.fadingSpeed;
        } else {
            pt_Square_trails.shift();
        }

        this.draw();   
    }
}

export { pt_Square, pt_Square_trails};