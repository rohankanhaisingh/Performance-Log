/*
 *  Fireview.js © by Rohan Kanhaisingh.
 * 
 *  Blob
 *  
 *  ./shapes/blob.js
 * 
*/ 

import { graphical_objects } from "../objects.js";
import { ctx, canvas, FireView } from "../../index.js";

class pt_Blob {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius
        graphical_objects.push(this);
    }
    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.x + this.radius, this.y + this.radius);
        ctx.bezierCurveTo(142 + this.radius, 79 + this.radius, 270 + this.radius, 6 + this.radius, 366 + this.radius, 103 + this.radius);
        ctx.bezierCurveTo(411 + this.radius, 148 + this.radius, 370 + this.radius, 213 + this.radius, 362 + this.radius, 226 + this.radius);
        ctx.bezierCurveTo(259 + this.radius, 400 + this.radius, 261 + this.radius, 306 + this.radius, 184 + this.radius, 262 + this.radius);
        ctx.bezierCurveTo(171 + this.radius, 255 + this.radius, 72 + this.radius, 123 + this.radius, 156 + this.radius, 79 + this.radius);
        ctx.stroke();
        ctx.restore();
    }
    update() {

        this.draw();
    }
}
export { pt_Blob };