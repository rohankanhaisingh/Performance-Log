/*
 *  Fireview.js © by Rohan Kanhaisingh.
 * 
 *  Particles
 * 
 * ./effects/particle.js
*/


import { canvas, ctx, FireView, RandomBetween } from '../../index.js';
import { mouse } from '../mouse.js';
import { graphical_objects } from '../objects.js';
import { setUniqueID } from '../uniqueID.js';

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const pd = function (x1, y1, x2, y2) {
    var x1, y1, x2, y2, a, b;

    a = Math.atan2(y2 - y1, x2 - x1);

    return {
        x: Math.cos(a),
        y: Math.sin(a)
    }
}

var img;


/** 
 * @param {Object} obj - Particle configuration.
 * @param obj.type - Type of the particles.
 * @param obj.startcolor - Start color of the particles.
 * @param obj.startSize - Start size of the particles.
 * @param obj.startPosition Start position of the particles.
 * @param obj.endPosition - End position of the particles.
 * @param obj.endSize - End size of the particles.
 * @param obj.image - Sets a image as particle.
 * @param obj.pulse - Sets a pulse on the movespeed of the particles.
 * @param obj.fadeSpeed - Sets a fadspeed.
 * @param obj.gravity - Enable or disable gravity.
 * @param obj.gravityForce - Sets a a gravity force.
 * @param obj.onDie - Sets a event on the particles when they die.
 * @param obj.onStart Sets a event on the particles when they start existing.
 * 
 * @param {number} amount Amount of particles that will be displayed.
 */
function pt_Particle(obj, amount) {
    var obj, amount, a, b, c, d, e, f = false;
    a = {
        type: 'dots',
        startColor: undefined,
        startSize: undefined,
        startPosition: undefined,
        endPosition: undefined,
        endSize: undefined,
        image: undefined,
        pulse: 1,
        fadeSpeed: 0.1,
        gravity: false,
        gravityForce: 0,
        onDie: undefined,
        onStart: undefined
    }
    for (b in obj) a[b] = obj[b];


    // Check if some properties exist.
    if (typeof a.startPosition == 'undefined') {
        throw new Error("The start position of the particles are not defined.")
        return;
    }else if (typeof a.type == 'undefined') {
        throw new Error("The type of the particles are not defined.");
        return;
    }

    if (typeof a.image !== 'undefined') {
        var i = new Image();
        i.src = a.image;
        i.onload = function () {
            img = this;
        }
    }

    if (typeof a.endPosition == 'string') {
        c = ['awayFromStartPosition', 'toMouse', 'random', 'randomNoise'];
        for (d in c) {
            if (a.endPosition == c[d]) {
                e = true;
            }
        }
        switch (e) {
            case true:
                f = true;
                break;
            case false || undefined:
                throw new Error(a.endPosition + " is not a valid endPosition type");
                return;
                break;
        }
    }

    if (!(typeof a.endPosition == 'string')) f = true;

    if (f) {
        for (var i = 0; i < amount; i++) {
            graphical_objects.push(new pt_private_particle(a));
        }
    }

}

function random(min, max) {
    return Math.random() * (max - min) + min;
}
class pt_private_particle {
    constructor(obj) {
        this.obj = obj;

        this.type = obj.type;

        this.x = obj.startPosition.x;
        this.y = obj.startPosition.y;

        this.default = {
            x: obj.startPosition.x,
            y: obj.startPosition.y
        }

        this.size = obj.startSize;
        this.color = obj.startColor;

        this.gravity = {
            active: obj.gravity,
            force: obj.gravityForce
        }

        this.endPosition = obj.endPosition;
        this.endSize = obj.endSize;

        this.fadeSpeed = obj.fadeSpeed;

        this.pulse = obj.pulse;

        this.moveX = 0;
        this.moveY = 0;

        this.onDie = obj.onDie;

        // Identity
        this.graphical_type = 'particle';
        this.id = setUniqueID(18);

        if (typeof obj.endPosition == 'string') {
            switch (obj.endPosition) {
                case "awayFromStartPosition":
                    this.moveX = Math.cos(random(0, Math.PI * 2)) * random(1, obj.pulse);
                    this.moveY = Math.sin(random(0, Math.PI * 2)) * random(1, obj.pulse);
                    break;
            }
        }
    }
    draw() {
        switch (this.type) {
            case "dots":
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
                ctx.fillStyle = this.color;
                ctx.fill();
                break;
            case "noise":
                ctx.beginPath();
                ctx.moveTo(this.x - Math.cos(random(0, Math.PI * 2)) * random(1, this.pulse), this.y - Math.sin(random(0, Math.PI * 2)) * random(1, this.pulse));
                ctx.lineTo(this.x, this.y);
                ctx.lineWidth = this.size;
                ctx.strokeStyle = this.color;
                ctx.stroke();

                ctx.restore();
                break;
            case "image":
                if (typeof img !== 'undefined') {
                    ctx.beginPath();
                    ctx.drawImage(img, this.x, this.y, this.size, this.size);
                }
        }
    }
    update() {

        if (this.gravity.active == true) {
            if (typeof this.gravity.force !== 'undefined') {
                if (this.y < canvas.height - this.size) {
                    this.moveY += this.gravity.force;
                }
            }
        }

        if (typeof this.endSize !== 'undefined' ) {
            if (typeof this.fadeSpeed !== 'undefined') {
                if (this.size > this.endSize) {
                    if (this.size > this.endSize + this.fadeSpeed) {
                        this.size -= this.fadeSpeed;
                    } else {
                        for (let i = 0; i < graphical_objects.length; i++) {
                            if (typeof graphical_objects[i].graphical_type !== 'undefined') {
                                if (graphical_objects[i].graphical_type == 'particle') {
                                    if (graphical_objects[i].id == this.id) {
                                        if (typeof this.onDie !== 'undefined' && typeof this.onDie == 'function') {
                                            this.onDie(self = this);
                                        }

                                        graphical_objects.splice(i, 1);
                                    }
                                }
                            }
                        }
                    }
                }
                if (this.size < this.endSize) {
                    if (this.size < this.endSize - this.fadeSpeed) {
                        this.size += this.fadeSpeed;
                    } else {
                        for (let i = 0; i < graphical_objects.length; i++) {
                            if (typeof graphical_objects[i].graphical_type !== 'undefined') {
                                if (graphical_objects[i].graphical_type == 'particle') {
                                    if (graphical_objects[i].id == this.id) {
                                        if (typeof this.onDie !== 'undefined' && typeof this.onDie == 'function') {
                                            this.onDie(self = this);
                                        }

                                        graphical_objects.splice(i, 1);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        this.x += this.moveX;
        this.y += this.moveY;       

        this.draw();
    }
}

export { pt_Particle }