import * as output from '../output.js';
import * as sh from '../../socketHandler.js';
import { socket } from '../../index.js';

function execute(command) {
    var a, b, c, d, e, f, out = "";

    a = command.split(" ");

    b = new XMLHttpRequest();
    b.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                c = JSON.parse(this.responseText);
                if (typeof c[a[0]] !== 'undefined') {
                    d = c[a[0]];
                    out += `${a[0]} | ${c[a[0]]['description']} <br><br> Argument usage: `;

                    c[a[0]]['arguments'].forEach(function (arg) {
                        out += `<code class="pl-command-arg">-${arg} </code> `;
                    });
                    out += `<br><br>Example: ${c[a[0]]['example']}`;

                    output.createOutputMessage("PL", out);
                } else {
                    output.createErrorMessage("PL", `${a[0]} is not a recognized class.`);
                }
            }
        }
    }
    b.open("GET", "../js/commandline/modules/commands/commands.json");
    b.send(null);
}

export { execute };