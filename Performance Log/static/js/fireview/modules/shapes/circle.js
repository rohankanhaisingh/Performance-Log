/**
 * Fireview.js © by Rohan Kanhaisingh.
 * 
 * Circle
 * 
 * ./shapes/circle.js
 */

import { canvas, ctx, FireView } from '../../index.js';
import { mouse } from '../mouse.js';
import { graphical_objects } from '../objects.js';
import { lines } from '../draw.js';
import { setUniqueID } from '../uniqueID.js';

class pt_Circle {
    /**
     * Creates a circle
     * @param {number} x Set the x position.
     * @param {number} y Set the y position.
     * @param {number} radius Set the radius.
     * @param {Object} style Set the style of the circle.
     * @param style.border.color Sets a border color of the circle.
     * @param style.border.width Sets the border width.
     * @param style.background Sets the background of the circle.
     */
    constructor(x, y, radius, style) {
        this.x = x;
        this.y = y;

        /**
         *  @type {number}
        */
        this.radius = radius;

        this.style = {
            border: { color: "#000", width: 1 },
            background: undefined
        }

        // Movements
        this.Move = {
            x: 0, 
            y: 0,
            decreaseSpeed: .1
        }

        // Gravity 
        this.yTick = 0;
        this.hasTouchedGround = false;
        this.bounceBack = 0;

        this.isDragging = false;
        this.isOnGround = false;

        /**
         * @type {Object?}
         * @property {object}
        */
        // Gravity
        this.Gravity = {
            Active: false,
            Force: 0
        }

        this.Collider = false;

        for (var a in style) {
            this.style[a] = style[a];
        }
        graphical_objects.push(this);
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

        if (typeof this.style.border !== 'undefined') {
            if (typeof this.style.border == 'object') {
                ctx.strokeStyle = this.style.border.color;
                ctx.lineWidth = this.style.border.width;
                ctx.stroke();
            }
        } if (typeof this.style.background !== 'undefined') {
            ctx.fillStyle = this.style.background;
            ctx.fill();
        }

    }
    update() {
        if (this.Gravity.Active) { // If the gravity is active.
            if (!this.isDragging) {
                if ((this.y <= canvas.height - (this.radius + 1))) {
                    this.Move.y += this.Gravity.Force;
                    if (!this.hasTouchedGround) {
                        this.yTick += 1;
                    }
                } else {
                    this.y = canvas.height - this.radius;
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
                        this.bounceBack -= this.Gravity.Force * (this.radius / 5);
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
                    if (this.x >= canvas.width - this.radius) {
                        this.x = canvas.width - this.radius;
                        this.Move.x = -this.Move.x / 5;

                        if (this.bounceBack > 10) {
                            this.bounceBack -= (this.radius / 7);
                        }
                    }
                    else if (this.x <= 0) {
                        this.x = 0;
                        this.Move.x = 10;
                        if (this.bounceBack > 10) {
                            this.bounceBack -= (this.radius / 7);
                        }
                    }
                }

                if (this.y > canvas.height) {
                    this.y = canvas.height - this.radius;
                }

                this.x += this.Move.x;
                this.y += this.Move.y;
            }
        }


        this.draw();
    }
}

export { pt_Circle };