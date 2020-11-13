import { createErrorMessage, createInputMessage, clearMessages } from './output.js';
import { commandType } from '../index.js';

// Import commands
import * as ReadFile from './commands/ReadFile.js';
import * as GetObject from './commands/GetObject.js';



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
                default:
                    createErrorMessage("PL", `"${b}" is not a recognized as a Performance-Log command. Please use <code class="pl-command-string">"Help"</code> to list a guide of commands.`);
                    break
            }
            break
    }
}

export { handle };