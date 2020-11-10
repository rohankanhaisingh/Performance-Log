/*
 *  Fireview.js © by Rohan Kanhaisingh.
 *  
 *  Triangle
 *  
 *  ./shapes/triangle.js
 */


import { canvas, ctx, FireView, Canvas } from '../../index.js';
import { mouse } from '../mouse.js';
import { graphical_objects } from '../objects.js';
import { lines, pt_Draw } from '../draw.js';
import { setUniqueID } from '../uniqueID.js';
import { pt_Audio } from '../audio/index.js';

class pt_Triangle {
    /**
     * Creates a new triangle
     * @param {number} x Start x position
     * @param {number} y
     * @param {number} p1
     * @param {number} p2
     * @param {number} p3
     * @param {object} style
     */
    constructor(x, y, p1, p2, p3, style) {
        this.x = x;
        this.y = y;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.style = style;
    }
    draw() {

    }
    update() {

    }
}

export { pt_Triangle };