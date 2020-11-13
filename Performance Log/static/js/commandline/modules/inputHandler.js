import * as plCommandHandler from './plCommandHandler.js';

var inputEvents = {
    focus: false,
}

function listen(element) {
    if (typeof element !== 'undefined') {
        if (element instanceof HTMLDivElement) {
            element.addEventListener("focusin", function () {
                inputEvents.focus = true;
            });
            element.addEventListener("focusout", function () {
                inputEvents.focus = false;
            });
            element.addEventListener("keydown", function (event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                    plCommandHandler.handle(this.innerText);
                }
            });
        }
    }
};

export { listen, inputEvents };