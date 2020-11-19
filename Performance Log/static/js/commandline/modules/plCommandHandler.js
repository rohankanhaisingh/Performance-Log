import { createErrorMessage, createInputMessage, clearMessages, createOutputMessage } from './output.js';
import { commandType, changeCommandType } from '../index.js';
import * as sh from '../socketHandler.js';
import { socket } from '../index.js';

// Import commands
import * as ReadFile from './commands/ReadFile.js';
import * as GetObject from './commands/GetObject.js';
import * as Execute from './commands/Execute.js';
import * as Help from './commands/Help.js';

function handle(command) {
    var a, b, c, d, e;
    if (command == '') {
        return;
    }

    a = command.split(" ");
    b = a[0];
    switch (commandType) {
        case "performanceLog":
            createInputMessage("PL", command);

            switch (b) {
                case "ReadFile":
                    ReadFile.execute(command.substring(9));
                    break;
                case "Clear":
                    clearMessages();
                    break;
                case "Get-Object":
                    GetObject.execute(command.substring(11));
                    break;
                case "Powershell":
                    changeCommandType('powershell');
                    createOutputMessage("PS", `Windows PowerShell Copyright (C) Microsoft Corporation. All rights reserved. Try the new cross-platform PowerShell https://aka.ms/pscore6`);
                    break;
                case "Execute":
                    Execute.execute(command.substring(8));
                    break;
                case "Help":
                    if (command.substring(5) !== '') {
                        Help.execute(command.substring(5));
                    }
                    break;
                case "Exit":
                    sh.emit(socket, "process.exit", {});
                    setTimeout(function () {
                        g.Alert("You can now close this window");
                    }, 1000);
                    break;
                default:
                    var i = 0;
                    for (var a in ReadFile.savedTextAreas) i += 1;          
                    if (i > 0) {
                        if (typeof ReadFile.savedTextAreas[b] == 'undefined') {
                            createErrorMessage("PL", `"${b}" is not a recognized as a Performance-Log command or is not a defined textinput. Please use <code class="pl-command-string">"Help"</code> to list a guide of commands.`);
                            return;
                        } else {
                            ReadFile.handleTextInput(command.substring(b.length + 1), ReadFile.savedTextAreas[b]);
                        }
                    }
                    if (i == 0) {
                        createErrorMessage("PL", `"${b}" is not a recognized as a Performance-Log command or is not a defined textinput. Please use <code class="pl-command-string">"Help"</code> to list a guide of commands.`);
                    }
                  

                    break
            }
            break;
        case "powershell":
            createInputMessage("PS", command);
            sh.emit(socket, "powershellcommand", command);
            break;
    }
}

export { handle };