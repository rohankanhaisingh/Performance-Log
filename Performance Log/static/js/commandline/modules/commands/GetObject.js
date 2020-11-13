import * as output from '../output.js';
import * as sh from '../../socketHandler.js';
import { socket } from '../../index.js';

function execute(command) {
    var a, b, c, d, e = {get: undefined, type: undefined}, f, g, args;
    args = command.split(" ");
    a = args[0]; // Type;
    if (typeof a !== 'undefined' && a !== "" && a.length > 0) {
        switch (a) {
            case "Memory":
                e.type = "mem";
                for (var i = 1; i < args.length; i++) {
                    b = args[i];
                    if (b.substring(0, 1) == '-') {
                        c = b.substring(1);
                        switch (c) {
                            case "Get":
                                d = command.substring(command.indexOf(b) + b.length + 1).split(" ")[0].split(`"`)[1]; 
                                e.get = d;
                                break;
                            default:
                                output.createErrorMessage("PL", `<code class="pl-command">${c}</code> is not a recognized Get-Object argument. Please enter <code class="pl-command">Help</code> <code class="pl-command-class">Get-Object</code> for more information about this command.`);
                                break;
                        }
                    }
                }

                sh.emit(socket, "getobject", e);
                break;
            default:
                output.createErrorMessage("PL", `<code class="pl-command-arg">${a}</code> is not a recognize object type. Enter Please enter <code class="pl-command">Help</code> <code class="pl-command-class">ReadFile</code> for more information about this command.`);
                break;
        }
    } else {
        output.createErrorMessage("PL", `Please enter a object type. Enter Please enter <code class="pl-command">Help</code> <code class="pl-command-class">ReadFile</code> for more information about this command.`)
    }
}

function handleObjectData(data) {
    var a, b = {a: []}, c, d, e, f = "", h, i, j;
    switch (data.type) {
        case "mem":
            a = data.data;
            for (c in a[1]) {
                b[c] = a[1][c];
            }
            for (c in a[0]) {
                for (d in a[0][c]) {
                    b.a.push({ [d]: a[0][c][d]});
                }
            }

            if (typeof data.get !== 'undefined') {
                if (typeof b[data.get] !== 'undefined') {
                    output.createOutputMessage("PL", `${b[data.get]}`);
                } else {
                    output.createErrorMessage("PL", `${data.get} is not a recognized JSON property.`);
                }
            } else {
                for (e in b) {
                    if (typeof b[e] == 'object') {
                        for (h in b[e]) {
                            for (i in b[e][h]) {
                                f += `<code class="json-property">${i}</code>: <code class="json-value">${b[e][h][i]}</code> <br>`;
                            }
                        }
                    } else {
                        f += `<code class="json-property">${e}</code>: <code class="json-value">${b[e]}</code> <br>`;
                    }
                }

                output.createOutputMessage("PL", `${f}`);
            }
            break;
    }
}

export { execute, handleObjectData };