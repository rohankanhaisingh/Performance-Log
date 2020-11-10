/*
 *  Fireview.js © by Rohan Kanhaisingh.
 * 
 *  CustomShape
 * 
 *  ./shapes/customShape.js
 */

import { canvas, ctx, FireView } from '../../index.js';
import { mouse } from '../mouse.js';
import { graphical_objects } from '../objects.js';
import { lines } from '../draw.js';
import { setUniqueID } from '../uniqueID.js';

class pt_CustomShape {
    /**
     * Creates a new custom shape.
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */
    constructor(x, y, width, height) {
        this.x = y;
        this.y = y;
        this.width = width;
        this.height = height;
        this.points = [];

        graphical_objects.push(this);
    }
    /**
     * Create a arc object.
     * @param {any} x
     * @param {any} y
     * @param {any} radius
     * @param {any} background
     * @param {any} borderColor
     * @param {any} borderWidth
     * @param {any} blurStrength
     * @param {any} blurColor
     */
    Arc(x, y, radius, background, borderColor, borderWidth, blurStrength, blurColor) {
        this.points.push({
            type: "CUSTOMSHAPE_ARC",
            x: x,
            y: y,
            radius: radius,
            background: background,
            borderColor: borderColor,
            borderWidth: borderWidth,
            blurStrength: blurStrength,
            blurColor: blurColor
        });
        return this;
    }
    Rect() {

    }
    /**
     * Creates a new line in this object.
     * @param {any} x1
     * @param {any} y1
     * @param {any} x2
     * @param {any} y2
     * @param {any} lineWidth
     * @param {any} lineColor
     * @param {any} blurStrength
     * @param {any} blurColor
     */
    AddLine(x1, y1, x2, y2, lineWidth, lineColor, blurStrength, blurColor) {
        this.points.push({
            type: 'CUSTOMSHAPE_LINE',
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            lineWidth: lineWidth,
            lineColor: lineColor,
            blurStrength: blurStrength,
            blurColor: blurColor
        });
        return this;
    }

    /**
     * Export this custom shape.
     * @param {("shape" | "image")} type Type of the file that will be exported.
     * @param {string} name Name of the file
     */
    Export(type, name,) {
        var type, name;

        switch (type) {
            case "shape":
                console.log(JSON.stringify(this));
                break;
            default:
                throw new Error(`${type} is not a valid type`);
                return;
                break;
        }
    }
    
    draw() {
        this.points.forEach((point) => {
            switch (point.type) {
                case "CUSTOMSHAPE_ARC":
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(this.x + point.x, this.y + point.y, point.radius, 0, 2 * Math.PI);
                    ctx.fillStyle = point.background;
                    ctx.fill();
                    ctx.strokeStyle = point.borderColor;
                    ctx.lineWidth = point.borderWidth;
                    ctx.stroke();
                    ctx.shadowColor = point.blurColor;
                    ctx.shadowBlur = point.blurColor;
                    ctx.restore();

                    break;
            }
        }); 
    }
    update() {
        this.draw();
    }
}
export { pt_CustomShape };