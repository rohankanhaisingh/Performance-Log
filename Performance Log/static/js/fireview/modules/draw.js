/*
 *  Fireview.js © by Rohan Kanhaisingh.
 *  
 *  Drawing objects.
 *  
 *  ./draw.js
*/


import { canvas, ctx, FireView, RandomBetween } from '../index.js';
import { mouse } from './mouse.js';
import { graphical_objects } from './objects.js';
import { setUniqueID } from './uniqueID.js';

var lines = [];
var lineIndex = 0;
const pt_Draw = {
    Line: class Line {
        /**
         * Creates a new line.
         * @param {number} x
         * @param {number} y
         * @param {object} style
         * @param style.width Set the width.
         * @param style.color Set the color.
         */
        constructor(x, y, style) {
            this.x = x;
            this.y = y;
            this.lineIndex = lineIndex;
            this.isLastPoint = false;
            this.style = {
                color: '#fff',
                width: 2,
            }

            this.startPosition = {
                x: x,
                y: y,
                yTick: 0,
                xTick: 0
            }

            this.Collider = false;

            this.moveX = 0;
            this.moveY = 0;

            this.Gravity = {
                Active: false,
                Force: 0
            }
            this.hasTouchedGround = false;
            this.gravityBounceBack;
            this.hasBounced = false;

            // Load properties from the style argument into the style object.
            for (var a in style) this.style[a] = style[a];

            this.identity = {
                type: 'userDrawedLine',
                uniqueId: setUniqueID(),
                canvasElement: canvas,
                canvasRenderctx: ctx
            }


            lineIndex += 1;
            lines.push(this);
            graphical_objects.push(this);
        }
        draw() {            
            if (!this.isLastPoint) {
                if (typeof lines[this.lineIndex - 2] !== 'undefined') {
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(lines[this.lineIndex - 1].x, lines[this.lineIndex - 1].y);
                    ctx.strokeStyle = this.style.color;
                    ctx.lineWidth = this.style.width;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
        update() {

            if (!this.Gravity.Active) {
                if (this.moveX > 0.1) {
                    this.moveX -= 0.1;
                }
                if (this.moveX < 0) {
                    this.moveX += 0.1;
                }
                if (this.moveY > 0.1) {
                    this.moveY -= 0.1;
                }
                if (this.moveY < 0) {
                    this.moveY += 0.1;
                }
            }

            if (this.Gravity.Active) {
                if (this.y < canvas.height) {
                    this.moveY += this.Gravity.Force;
                    this.startPosition.yTick += 1;
                } else {
                    if (this.Collider) {
                        if (!this.hasTouchedGround) {
                            this.hasTouchedGround = true;

                            this.gravityBounceBack = this.startPosition.yTick;

                            //if (this.startPosition.yTick > 40) {
                            //    this.gravityBounceBack = 40;
                            //} else {
                            //    this.gravityBounceBack = this.startPosition.yTick;
                            //}
                        }

                        if (this.gravityBounceBack > 0) {
                            if (!this.hasBounced) {
                                this.hasBounced = true;
                                this.gravityBounceBack -= (this.style.width / 2);
                                this.y = canvas.height - (this.style.width / 2);

                                this.moveY -= this.gravityBounceBack;
                                setTimeout(() => {
                                    this.hasBounced = false;
                                }, 1);
                            }
                        }
                        if (!(this.gravityBounceBack > 0)) {
                            this.moveY = 0;
                            this.gravityBounceBack = 0;
                            this.y = canvas.height - (this.style.width / 2);
                            this.Gravity.Active = false;
                        }
                    }
                } 
            }

            if (this.Collider) {
                //for (var i = 0; i < lines.length; i++) {
                //    const l = lines[i];

                //    if (l.lineIndex !== this.lineIndex) {
                //        if ((l.x > this.x - 1 && l.x < this.x + this.style.width) && (l.y > this.y - 1 && l.y < this.y + this.style.width)) {
                //            this.moveY = RandomBetween(-2, 2);
                //            this.moveX = RandomBetween(-2, 2);
                //        };
                //    }
                //}
            }

            this.x += this.moveX;
            this.y += this.moveY;

            ctx.beginPath();
            this.draw();
        }
        /**
         * Kills every line.
         */
        dieAll() {
            for (var i = 0; i < graphical_objects.length; i++) {
                if (typeof graphical_objects[i].identity !== 'undefined') {
                    if (graphical_objects[i].identity.type == 'userDrawedLine') {
                        graphical_objects.splice(i, 1);
                    }
                }
            }
        }
        /**
         * Kills a specific line.
         * @param {number} index
         */
        die(index) {
            var index;
            graphical_objects.splice(index, 1);
        }
    },
    /**
     * Kills a specific line.
     * @param {(number | "all")} a Index of array.
     */
    Clear: function (a) {
        var a, b, c, d, e;
        switch (typeof a) {
            case 'number':
                lines.splice(a, 1);
                break;
            case 'string':
                if (a == 'all') {
                    var a = 0; 
                    for (var i = 0; i < lines.length; i++) {
                        lines[i].dieAll();
                    }
                }
                break;
        }
    },
    /**
     * Erases lines in a radius.
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     */
    Erase: function (x, y, radius) {
        var x, y, radius;
        for (var i = 0; i < graphical_objects.length; i++) {
            if (typeof graphical_objects[i].identity !== 'undefined') {
                if (graphical_objects[i].identity.type == 'userDrawedLine') {
                    var ix = graphical_objects[i].x;
                    var iy = graphical_objects[i].y;
                    var ir = graphical_objects[i].style.width;
                    if ((x > ix - radius && x < ix + (ir + radius)) && (y > iy - radius && y < iy + (ir + radius))) {
                        graphical_objects[i].die(i);
                    }
                }
            }
        }
    },
    /**
     * Adds a force for every line.
     * @param {number} x
     * @param {number} y
     */
    AddForce(x, y) {
        var x, y;
        lines.forEach((l) => {
            l.moveX += x;
            l.moveY += y;
        });
    },
    /**
     * 
     * @param {("enableGravity" | "collider" | "color" | "width")} property
     * @param {any} value
     */
    SetLinesProperty(property, value) {
        var property, value, a, b, c;
        a = ['enableGravity', 'collider', 'color', 'width'];

        for (a in lines) {
            if (typeof lines[a] !== 'undefined') {
                switch (property) {
                    case "enableGravity":
                        if (typeof value == 'boolean' && typeof value !== 'undefined') {
                            lines[a].Gravity.Active = value;
                        } else {
                            throw new Error("The given argument (as value) is not a boolean OR is not defined.");
                            return;
                        }
                        break;
                    case "collider":
                        if (typeof value == 'boolean' && typeof value !== 'undefined') {
                            lines[a].Collider = value;
                        } else {
                            throw new Error("The given argument (as value) is not a boolean OR is not defined.");
                            return;
                        }
                }
            }
        }
    },
    GetLineProprties: function () {
        console.log(JSON.parse(JSON.stringify(lines)));
    },
    Text: class pt_te_Text {
        /**
         * Write text on the canvas.
         * @param {string} text
         * @param {number} x
         * @param {number} y
         * @param {object} style
         * @param style.fillColor The fillcolor of the text.
         * @param style.strokeColor The border color of the text;
         * @param style.fontSize Sets the font size.
         * @param style.fontWeight Sets the font weight.
         * @param style.fontFamily Sets the font family.
         */
        constructor(text, x, y, style) {
            this.text = text; // Set the text.

            this.graphical_type = 'text';
            this.id = setUniqueID(18);

            // Position.
            this.x = x;
            this.y = y;

            // Move speed.
            this.moveX = 0;
            this.moveY = 0;

            // Bounce mechanics.
            this.yTick = 0;
            this.hasTouchedGround = false;
            this.hasBounced = false;

            // Text style.
            this.style = { fillColor: '#000',strokeColor: undefined,fontSize: 20,fontWeight: 'normal',fontFamily: 'Arial'}; for (var a in style) this.style[a] = style[a];

            // Gravity.
            this.Gravity = {
                Active: false,
                Force: 0
            }

            // Collider.
            this.Collider = false;

            // Width and height of the text.
            this.width;
            this.height;

            graphical_objects.push(this);
        }
        draw() {
            ctx.save();
            ctx.beginPath();

            ctx.font = `${this.style.fontWeight} ${this.style.fontSize}px ${this.style.fontFamily}`;
            if (this.style.strokeColor !== undefined) {
                ctx.strokeStyle = this.style.fillColor;

                this.width = ctx.measureText(this.text).width;
                this.height = this.style.fontSize;

                ctx.strokeText(this.text, this.x, this.y);
            }
            else if (this.style.fillColor !== undefined) {
                ctx.fillStyle = this.style.fillColor;

                this.width = ctx.measureText(this.text).width;
                this.height = this.style.fontSize;

                ctx.fillText(this.text, this.x, this.y); 
            }
            ctx.restore();
        }
        update() {
            if (this.Gravity.Active == true) {
                if (this.Collider) {
                    if (this.y < canvas.height) {
                        this.moveY += this.Gravity.Force;

                        if (!this.hasTouchedGround) {
                            this.yTick += 1;
                        }

                    } else {
                        if (!this.hasTouchedGround) {
                            this.hasTouchedGround = true;

                            if (this.yTick > 20)
                                this.yTick = 20;
                        } else {
                            if (this.yTick > 0) {
                                this.y = canvas.height - this.height;
                                this.moveY = -this.yTick;
                                this.yTick -= (this.style.fontWeight / 50);
                            } else {
                                this.yTick = 0;
                                this.y = canvas.height - this.height;
                                this.moveY = 0;
                            }
                        }
                    }
                }
            }
            this.x += this.moveX;
            this.y += this.moveY;

            this.draw();
        }
        /**
         * Kills the current text.
         * */
        Die() {
            for (let i = 0; i < graphical_objects.length; i++) {
                if (typeof graphical_objects[i].graphical_type !== 'undefined') {
                    if (graphical_objects[i].graphical_type == 'text') {
                        if (graphical_objects[i].id == this.id) {
                            graphical_objects.splice(i, 1);
                        }
                    }
                }
            }
        }
    }
}

export { pt_Draw, lines };
