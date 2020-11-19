import * as output from '../output.js';
import * as sh from '../../socketHandler.js';
import { socket } from '../../index.js';

var savedTextAreas = {};

function sw(length) {
    var a, b, c, d, e, f;
    a = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    b = "";
    if (length !== undefined) {
        for (var i = 0; i < length; i++) {
            c = Math.floor(Math.random() * a.length);
            d = a.charAt(c);
            b += d;
        }
    } else {
        for (var i = 0; i < 12; i++) {
            c = Math.floor(Math.random() * a.length);
            d = a.charAt(c);
            b += d;
        }
    }
    return b;
}


function execute(command) {
    var a, b, c = {path: undefined, writeTo: undefined, parseString: false, get: undefined, storeAs: undefined }, d, e, f, errList = [];
    const args = command.split(" ");

    args.forEach(function (arg) {
        if (arg.substring(0, 1) == '-') {
            a = arg.substring(1).split(" ")[0];
            switch (a) {
                case "Path":
                    b = command.substring(command.indexOf(a) + a.length + 1).split(" ")[0].split(`"`)[1];
                    c.path = b;
                    break;
                case "WriteTo":
                    b = command.substring(command.indexOf(a) + a.length + 1).split(" ")[0].split(`"`)[1];
                    c.writeTo = b;
                    break;
                case "Parse":
                    c.parseString = true;
                    break;
                case "Get":
                    b = command.substring(command.indexOf(a) + a.length + 1).split(" ")[0].split(`"`)[1];
                    c.get = b;
                    break;
                case "StoreAs":
                    b = command.substring(command.indexOf(a) + a.length + 1).split(" ")[0].split(`"`)[1];
                    c.storeAs = b;
                    break;
                default:
                    output.createErrorMessage("PL", `<code class="pl-command">${arg}</code> is not a recognized ReadFile argument. Please enter <code class="pl-command">Help</code> <code class="pl-command-class">ReadFile</code> for more information about this command.`);
                    return;
                    break;
            }
        }
    });

    // Check if important arguments are attached.
    if (typeof c.path == 'undefined') {
        output.createErrorMessage("PL", "Missing -Path argument with string after.");
    }

    if (c.path.substring(0, 1) == '@') {

    } else {
        d = new XMLHttpRequest();;
        d.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    if (typeof c.parseString !== 'undefined') {
                        if (c.parseString) {
                            if (typeof c.get !== 'undefined') {
                                e = JSON.parse(this.responseText)[c.get];
                                if (typeof e !== 'undefined') {
                                    output.createOutputMessage("PL", `${e}`);
                                } else {
                                    output.createErrorMessage("PL", `Property <code class="pl-command-string">${c.get}</code> is not a recognized JSON property in this file.`);
                                }
                            } else {
                                output.createOutputMessage("PL", `${JSON.parse(this.responseText)}`);
                            }
                        } else {
                            var ta = document.createElement("div");
                            ta.innerText = this.responseText;
                            ta.contentEditable = true;
                            ta.className = 'pl-output-textarea';
                            ta.setAttribute("t-id", sw(12));

                            if (typeof c.storeAs !== 'undefined') {
                                if (typeof savedTextAreas[c.storeAs] == 'undefined') {
                                    savedTextAreas[c.storeAs] = {
                                        element: ta,
                                        content: ta.innerText,
                                        path: c.path
                                    };

                                    ta.addEventListener("keyup", function () {
                                        savedTextAreas[c.storeAs].content = this.innerText;
                                    });
                                } else {
                                    output.createErrorMessage("PL", `Text field named ${c.storeAs} already exist. Please enter <code class="pl-command">${c.storeAs}</code> <code class="pl-command-arg">-Remove</code> to remove this variable.`)
                                }
                            }
                            output.createOutputMessage("PL", null, "textArea", [ta]);
                        }
                    }
                } else {
                    output.createErrorMessage("PL", `The file <code class="pl-command-string">"${c.path}"</code> cannot be found. Did you forget anything to add?.`);
                    return;
                }
            }
        }
        if (typeof c.path !== 'undefined') {
            d.open("GET", c.path, true);
            d.send(null);
        }
    }
}

function handleTextInput(command, obj) {
    var a, b, c, d, e;
    obj.element.classList.add("blink");

    $g(".container in .commandline-output").scroll({
        top: obj.element.offsetTop,
        behavior: "smooth"
    });

    setTimeout(function () {
        obj.element.classList.remove("blink");
    }, 2000);

    a = command.split(" ");
    a.forEach(function (arg) {
        if (arg.substring(0, 1) == "-") {
            switch (arg.substring(1)) {
                case "Save":
                    sh.emit(socket, "saveFile", obj);
                    output.createOutputMessage("PL", `File has been saved at ${new Date()} to ${obj.path}`);
                    break;
                case "Remove":

                    break;
                default:
                    output.createErrorMessage("PL", `<code class="pl-command-arg">${arg}</code> is not a recognized argument for this variable.`);
                    break;
            }
        }
    });
}

export { execute, savedTextAreas, handleTextInput };