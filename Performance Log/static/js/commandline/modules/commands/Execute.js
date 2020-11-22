import * as output from '../output.js';
import * as sh from '../../socketHandler.js';
import { socket } from '../../index.js';

/**
 * Executes the Execute command (lmao nice).
 * @param {string} command
 */
const execute = command => {
    const splitText = command.split(" ");
    const executableType = splitText[0];
    const args = command.substring(executableType.length + 1).split(" ");

    const options = {
        closeAll: undefined,
        maxPlayers: 10,
        physicalMemory: 2048,
        useDiscordPresence: false
    }

    let argumentValue, argumentValueNumber, byteType, byteNumber;

    // If the variable is not undefined, not empty and the length is also more than 0, execute that code.
    if (typeof executableType !== 'undefined' && executableType !== '' && executableType.length > 0) {

        // Select the executable type.
        switch (executableType) {
            case "MinecraftServer":
                // Run a dedicated minecraft server.

                for (let arg in args) {
                    let text = args[arg];

                    // Check if the first character starts with a '-'.
                    if (text.substring(0, 1) == '-') {
                        let argumentName = text.substring(1);

                        switch (argumentName) {
                            case "MaxPlayers":

                                argumentValue = command.substring(command.indexOf(text) + (text.length + 1)).split(" ")[0]; // Gets the value after the argument
                                argumentValueNumber = parseFloat(argumentValue); // Convert the value into a number. This can return a number or NaN.

                                if (!isNaN(argumentValueNumber)) {
                                    options.maxPlayers = argumentValueNumber;
                                } else {
                                    output.createErrorMessage('PL', `Cannot convert string into a number. Please make sure there are no letter, spaces or symbols in the value. At -MaxPlayers ${argumentValue}`);
                                }


                                break;
                            case "PhysicalMemory":

                                argumentValue = command.substring(command.indexOf(text) + (text.length + 1)).split(" ")[0]; // Gets the value after the argument

                                // Get the last 2 characters of the argument value. This is the
                                byteType = argumentValue.substring(argumentValue.length - 2).toUpperCase();
                                byteNumber = parseFloat(argumentValue); // Convert the value into a number. This can return a number or NaN.

                                // Check if the number is not NaN.
                                if (!isNaN(byteNumber)) {
                                    switch (byteType) {
                                        case "GB":
                                            // If the bytetype is gigabyte.
                                            options.physicalMemory = byteNumber * 1024;

                                            break;
                                        case "MB":
                                            options.physicalMemory = byteNumber;
                                            break;
                                        default:
                                            // If none of these cases match.

                                            output.createErrorMessage("PL", `"${byteType}" is not a recognized or a supported bytetype for this function. Please use MB or GB`);

                                            break;
                                    }
                                } else {

                                    // If string cannot be converted into a number.
                                    output.createErrorMessage('PL', `Cannot convert string into a number. Please make sure there are no letter, spaces or symbols in the value. At -PhysicalMemory ${argumentValue}`);
                                }

                                console.log(argumentValue);

                                break;
                            case "UseDiscordPresence":
                                // No need to split or handle a value after this after this argument.

                                options.useDiscordPresence = true;

                                break;
                            case "CloseAll":
                                // Close the server and prevent the app to start another server.

                                options.closeAll = true;

                                break;
                            default:
                                // Return a error if no case matches.

                                output.createErrorMessage("PL", `${text} is not a recognized argument for this function.`);

                                break;
                        }
                    }
                }
                

                if (typeof options.closeAll !== 'undefined') {
                    sh.emit(socket, "execute:ms_server:close", options);
                } else {
                    sh.emit(socket, "execute:ms_server", options);
                }
                break;
            default:
                // If none of these cases matches, return a error.

                output.createErrorMessage("PL", `${executableType} is not a recognized executable function. Please enter <code class="pl-command">Help</code> <code class="pl-command-class">Execute</code> for more information about this command.`);
                
                break;
        }
    }
}

export { execute };