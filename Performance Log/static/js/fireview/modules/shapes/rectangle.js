/**
 *  Fireview.js © by Rohan Kanhaisingh.
 * 
 *  Rectangle
 * 
 *  ./shapes/rectangle.js
*/

import { canvas, ctx, FireView, Canvas } from '../../index.js';
import { mouse } from '../mouse.js';
import { graphical_objects } from '../objects.js';
import { lines, pt_Draw } from '../draw.js';
import { setUniqueID } from '../uniqueID.js';
import { pt_Audio } from '../audio/index.js';

class pt_Rectangle {
    
    /**
     * Creates a new rectangle
     * @param {number} x Sets the x position.
     * @param {number} y Sets the y position.
     * @param {number} width Sets the width.
     * @param {number} height Sets the height.
     * @param {object} style Style object.
     * @param style.background Sets the background color of the rectangle.
     * @param style.borderColor Sets the border color of the rectangle.
     * @param style.borderWidth Sets the border width of the rectangle.
     * @param style.shadowColor Sets the shadow color of the rectangle. 
     * @param style.shadowBlur Sets the shadow blur strengh of the rectangle. NOTE: Bigger strength could reduce the webpage performance!
     * @param style.shadowOffsetX Sets the x position of shadow offset.
     * @param style.shadowOffsetY Sets the y position of shadow offset.
     * 
     * @namespace
     * @property {object} Gravity
     * @property {boolean} Gravity.Active - Enables the gravity effect.
     * @property {number} Gravity.Force - Sets the force of this object's gravity.
     * @property {number} Gravity.Weight - Sets the weight of the object. The object will faster based on the weight.
     */
    constructor(x, y, width, height, style) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        if (typeof style !== 'undefined') {
            // Style
            this.background = style.background;
            this.borderColor = style.borderColor;
            this.borderWidth = style.borderWidth;
            this.shadowColor = style.shadowColor;
            this.shadowBlur = style.shadowBlur;
            this.shadowOffsetX = style.shadowOffsetX;
            this.shadowOffsetY = style.shadowOffsetY;
        }

        // Identity 
        this.id = setUniqueID(18);
        this.type = 'SHAPE_RECTANGLE';

        // Gravity, movements and physics
        this.moveX = 0;
        this.moveY = 0;

        this.Collider = false;

        this.isOnGround = false;
        this.hasTouchedTheGroundAtFirst = false;
        this.calculatedBounce = 0;


        this.Gravity = {
            Active: false,
            Force: 0,
            Weigth: 0
        }

        // Dragging 
        this.isDragging = false;
        this.allowDragging = false;
        this.draggingTarget;
        this.dragPoints = {};
        this.dragPointsSelected = false;

        graphical_objects.push(this);
    }

    // Unuseful methods.
    draw() {
        ctx.save();
        ctx.beginPath();

        ctx.rect(this.x, this.y, this.width, this.height);

        if (typeof this.borderWidth !== 'undefined') {
            ctx.lineWidth = this.borderWidth;
        } if (typeof this.shadowColor !== 'undefined') {
            ctx.shadowColor = this.shadowColor;
        } if (typeof this.shadowBlur !== 'undefined') {
            ctx.shadowBlur = this.shadowBlur;
        } if (typeof this.shadowOffsetX !== 'undefined') {
            ctx.shadowOffsetX = this.shadowOffsetX;
        } if (typeof this.shadowOffsetY !== 'undefined') {
            ctx.shadowOffsetY = this.shadowOffsetY;
        }

        if (typeof this.background !== 'undefined') {
            ctx.fillStyle = this.background;
            ctx.fill();
        } if (typeof this.borderColor !== 'undefined') {
            ctx.strokeStyle = this.borderColor;
            ctx.stroke();
        }

        ctx.restore();
    }
    update() {
        if (this.Gravity.Active) {
            if (this.Collider) {
                if (this.y < canvas.height - this.height) {
                    if (!this.isOnGround) {
                        this.moveY += this.Gravity.Force + this.Gravity.Weigth;
                    }

                    if (!this.hasTouchedTheGroundAtFirst) {
                        this.calculatedBounce += 1;
                    }
                } else {
                    if (!this.hasTouchedTheGroundAtFirst) {
                        this.hasTouchedTheGroundAtFirst = true;
                    }

                    if (this.calculatedBounce > 0) {
                        this.y = canvas.height - this.height;
                        this.moveY = -this.calculatedBounce;

                        this.calculatedBounce -= (1 + this.Gravity.Weigth);
                    } else {
                        this.y = canvas.height - this.height;
                        this.moveY = 0;
                        this.isOnGround = true;
                    }
                }
            } else {
                this.moveY += this.Gravity.Force + this.Gravity.Weigth;
            }
        }

        // Dragging
        if (this.allowDragging) {
            if (this.draggingTarget !== undefined) {
                if (mouse.pressingLeft) {
                    if ((mouse.x > this.x && mouse.y < this.x + this.width) && (mouse.y > this.y && mouse.y < this.y + this.height)) {
                        if (!this.dragPointsSelected) {
                            this.moveY = 0;
                            this.moveX = 0;
                            this.dragPoints.x = mouse.x - this.x;
                            this.dragPoints.y = mouse.y - this.y;
                            this.dragPointsSelected = true;
                            this.isDragging = true;
                        }

                        if (this.dragPointsSelected) {
                            this.x = mouse.x - this.dragPoints.x;
                            this.y = mouse.y - this.dragPoints.y;
                        }
                    }
                }

                if (!mouse.pressingLeft) {
                    this.dragPointsSelected = false;
                    this.isDragging = false;
                }
            }
        }


        this.x += this.moveX;
        this.y += this.moveY;

        this.draw();
    }

    // Accessable and useful methods.
    /**
     * @param {Canvas} target
     */
    Drag(target) {
        if (target instanceof FireView.Canvas) {
            this.allowDragging = true;
            this.draggingTarget = target;
        } else {
            throw new TypeError("The given argument (as target) is not a FireView.Canvas instance.");
            return;
        }
    }
}

export { pt_Rectangle };