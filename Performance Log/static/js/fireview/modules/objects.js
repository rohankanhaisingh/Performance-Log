/*
 *  Fireview.js © by Rohan Kanhaisingh.
 * 
 *  Object and group handlers
 *  
 *  Fireview.js © by Rohan Kanhaisingh.
 */

const graphical_objects = [];
const drawing_objects = [];
const particles = [];
const trails = [];
const htmlElements = [];


class pt_Group {
    #arr;
    
    constructor(options) {
        this.#arr = [];

        if (typeof options !== 'undefined') {
            this.maxSize = options.maxSize;
            this.allowType = options.allowType;
        }

    }
    Execute(type, args) {
        switch (type) {
            case "AddForce":

                break;
        }
    }
    /**
     * Adds a item to this group.
     * @param {("shape" | "audio" | "canvas")} type
     * @param {any} value
     * @param {object} arguments
     */
    AddItem(type, value, args) {
        switch (type) {
            case "shape":
                this.#arr.push(value);
                return this;
                break;
        }
    }

    /**
     * Sorts the group and returns the list.
     * @param {("name" | "id" | "creationdate")} sortby
     */
    Sort(sortby) {
        switch (sortby) {
            case "name":

                break;
            case "id":

                break;
            case "creationdate":

                break;
        }
    }
}



function add(val) {
    graphical_objects.push(val);
}

function addD(val) {
    drawing_objects.push(val);
}



export { add, graphical_objects, addD, pt_Group};