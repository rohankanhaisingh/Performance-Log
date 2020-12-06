import { createErrorMessage, createInputMessage, clearMessages, createOutputMessage } from './output.js';
import { commandType, changeCommandType } from '../index.js';
import * as sh from '../socketHandler.js';
import { socket } from '../index.js';

// Import commands
import * as ReadFile from './commands/ReadFile.js';
import * as GetObject from './commands/GetObject.js';
import * as Execute from './commands/Execute.js';
import * as Help from './commands/Help.js';
import * as Echo from './commands/Echo.js';

/**
 * Handle commands.
 * @param {string} command
 */
const handle = command => {
    let commandKeyword, commandArguments;

    if (command == '') return;

    commandKeyword = command.split(" ")[0];
    commandArguments = command.substring(commandKeyword.length + 1);

    switch (commandType) {
        case "performanceLog":
            createInputMessage("PL", command);

            if (commandKeyword.substring(0, 1) == '#') {
                let cmdExecutable = commandKeyword.substring(1);

                switch (cmdExecutable) {
                    case "Run":

                        break;
                    case "Stop":

                        break;
                    default:
                        createErrorMessage("PL", `${cmdExecutable} is not a recognized Performance-Log executable function.`);
                        break;
                }
            } else {
                // Check what the keyword is.
                switch (commandKeyword) {
                    case "ReadFile":

                        ReadFile.execute(commandArguments);

                        break;
                    case "Clear":
                        clearMessages();
                        break;
                    case "Get-Object":
                        GetObject.execute(command.substring(11));
                        break;
                    case "Powershell":
                        // Change the command type.
                        changeCommandType('powershell');

                        // Create a epic powershell startup line.
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
                            let noti = new WebNotification("Performance Log", "Server got closed", "You closed the webserver, this page wont respond on your requests anymore. Please close this window/tab or restart the server.", null, 10000);
                        }, 1000);
                        break;
                    case "Echo":
                        Echo.execute(commandArguments);
                        break;
                    case "Javascript":
                        changeCommandType("javascript");

                        createOutputMessage("JS", "Javascript executable");
                        break;
                    default:
                        // If the keyword is none of these cases

                        let i = 0; // Start index number

                        for (let item in ReadFile.savedTextAreas) i += 1;

                        // Check if the command is a variable or not
                        if (i > 0) {
                            if (typeof ReadFile.savedTextAreas[commandKeyword] == 'undefined') {
                                createErrorMessage("PL", `"${commandKeyword}" is not a recognized as a Performance-Log command or is not a defined textinput. Please use <code class="pl-command-string">"Help"</code> to list a guide of commands.`);
                                return;
                            } else {
                                ReadFile.handleTextInput(commandArguments, ReadFile.savedTextAreas[commandKeyword]);
                            }
                        }
                        if (i == 0) {
                            createErrorMessage("PL", `"${commandKeyword}" is not a recognized as a Performance-Log command or is not a defined textinput. Please use <code class="pl-command-string">"Help"</code> to list a guide of commands.`);
                        }


                        break
                }
            }
            break;
        case "powershell":
            createInputMessage("PS", command);
            sh.emit(socket, "powershellcommand", command);
            break;
        case "javascript":

            try {
                createOutputMessage("JS", eval(command));
            } catch (err) {
                createErrorMessage("JS", err);
            }

            break;
    }
}

export { handle };