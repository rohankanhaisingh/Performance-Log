/*
 * Fireview.js © by Rohan Kanhaisingh.
 * 
 * Lightsources
 * 
 * ./effects/lightsource.js
*/ 

import { graphical_objects } from "../objects.js";
import { canvas, ctx, FireView, RandomBetween } from '../../index.js';
import { setUniqueID } from "../uniqueID.js";

const pt_LightSource = {
    SpotLight: class SpotLight {
        /**
         * Creates a spotlight lightsource
         * @param {number} startX
         * @param {number} startY
         * @param {number} endX
         * @param {number} endY
         * @param {number} startRadius
         * @param {number} endRadius
         * @param {string} color
         * @param {number} blur
         * @param {string} blurColor
         */
        constructor(startX, startY, endX, endY, startRadius, endRadius, color, blur, blurColor) {
            this.startX = startX;
            this.startY = startY;
            this.endX = endX;
            this.endY = endY;
            this.startRadius = startRadius;
            this.endRadius = endRadius;
            this.color = color;
            this.blur = blur;
            this.blurColor = blurColor;

            this.type = 'LIGHTSOURCE_SPOTLIGHT'
            this.id = setUniqueID(18);


            graphical_objects.push(this);
        }
        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(this.startX - this.startRadius, this.startY);
            ctx.lineTo(this.startX - this.startRadius, this.startY);
            ctx.lineTo(this.endX - this.endRadius, this.endY);
            ctx.lineTo(this.endX + this.endRadius, this.endY);
            ctx.shadowBlur = this.blur;
            ctx.shadowColor = this.blurColor;

            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.restore();
        }
        update() {
            //graphical_objects.forEach(function (object) {
            //    if (typeof object.lightCollider !== 'undefined') {
            //        if (object.lightCollider == true) {

            //        }
            //    }
            //});

            this.draw();
        }
    },
    Bulp: class Bulp {
        /**
         * Creates a new bulp light source.
         * @param {number} x
         * @param {number} y
         * @param {number} radius
         * @param {string} color
         * @param {number} blurStrength
         * @param {string} blurColor
         */
        constructor(x, y, radius, color, blurStrength, blurColor) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.blurStrength = blurStrength;
            this.blurColor = blurColor;

            this.id = setUniqueID(19);
            this.type = "LIGHTSOURCE_BULP";
        }
        draw() {

        }
        update() {

            this.draw();
        }
    }
}

export { pt_LightSource };