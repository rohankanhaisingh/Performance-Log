import * as output from '../output.js';

function execute(command) {
    var a, b, c = {path: undefined, writeTo: undefined, parseString: false, get: undefined }, d, e, f, errList = [];
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
                        output.createOutputMessage("PL", `<textArea spellcheck="false" contenteditable="false">${this.responseText}</textArea>`);
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

export { execute };