class CanvasContext {
    /**
     * Creates a new Canvas 2d Context
     * @param {HTMLElement} element
     * @param {HTMLElement} textElement
     */
    constructor(element, textElement) {
        this.element = element;
        this.ctx = this.element.getContext("2d");
        this.textElement = textElement;
    }
    /**
     * Updates the CanvasContext
     * @param {number} angle
     * @param {number} usage
     */
    update(angle, usage) {
        this.ctx.clearRect(0, 0, 300, 300);
        for (var i = 0; i < angle; i++) {

            var x, y, range = 0;

            if (i % 2 === 0) {
                range = -10;
            }

            x = (290 / 2) + (110 + range) * Math.cos(i * Math.PI / 180);
            y = (290 / 2) + (110 + range) * Math.sin(i * Math.PI / 180);
            this.ctx.beginPath();
            this.ctx.moveTo((290 / 2), (290 / 2));
            this.ctx.lineTo(x, y);
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = '#fe2f2f';
            this.ctx.stroke();
        }

        this.textElement.innerText = usage + "%";
    }
}

export { CanvasContext };