import * as output from '../output.js';
import * as sh from '../../socketHandler.js';
import { socket } from '../../index.js';

/**
 * Copied from https://stackoverflow.com/questions/19793221/javascript-text-between-double-quotes
 * Extract every string.
 * @param {string} str
 */
function extractAllText(str) {
    const re = /"(.*?)"/g;
    const result = [];
    let current;
    while (current = re.exec(str)) {
        result.push(current.pop());
    }
    return result.length > 0
        ? result
        : [str];
}

/**
 * Execute the Get-Object command.
 * @param {any} command
 */
const execute = command => {
    const options = {
        type: undefined,
        get: undefined
    }

    const type = command.split(" ")[0];
    const args = command.substring(type.length + 1).split(" ");
    const strings = extractAllText(command.substring(type.length + 1));

    let index = 0;

    // If type is not undefined and if the length is more than 0
    if (typeof type !== 'undefined' && type !== "" && type.length > 0) {
        switch (type) {
            case "Memory":
                // If memory is the type.

                options.type = "mem"; // Set the type to 'mem'.

                // Loop through the arguments array.
                args.forEach(arg => {

                    // Check if the first character starts with a '-'.
                    if (arg.substring(0, 1) == '-') {
                        switch (arg.substring(1)) {
                            case "Get":

                                options.get = strings[index];

                                index += 1;
                                break;
                            default:
                                // If the argument is none of these cases.

                                output.createErrorMessage("PL", `${arg} is not a recognized Get-Object argument.`);
                                break;
                        }
                    }
                });

                sh.emit(socket, "getobject", options);
                break;
            default:
                output.createErrorMessage("PL", `<code class="pl-command-arg">${type}</code> is not a recognize object type. Enter Please enter <code class="pl-command">Help</code> <code class="pl-command-class">ReadFile</code> for more information about this command.`);
                break;
        }
    } else {
        output.createErrorMessage("PL", `Please enter a object type. Enter Please enter <code class="pl-command">Help</code> <code class="pl-command-class">ReadFile</code> for more information about this command.`)
    }
}

// Handle the data that the server sent.
const handleObjectData = data => {
    const type = data.type;
    const options = {
        get: data.get
    }

    // Check what type of data it is.
    switch (type) {
        case "mem":
            // Execute this codeblock for the memory data.

            const data1 = data.data[0];
            const data2 = data.data[1];

            const tempObject1 = {};
            const tempObject2 = {};

            let foundProperty = false;
            let property;
            let out = "";

            // Data1 has also some arrays.
            data1.forEach(d => {
                // Variable d is also a array... 
                for (let item in d) {
                    tempObject1[item] = d[item];
                }
            });

            // Yay, lets loop again!!
            for (let item in data2) {
                tempObject2[item] = data2[item];
            }

            // Okay now lets gather all information and put it into the out string.
            // That means we have to do 2 loopings more...

            for (let item in tempObject1) {
                out += `${item}: ${tempObject1[item]} <br>`;
            }

            for (let item in tempObject2) {
                out += `${item}: ${tempObject2[item]} <br>`;
            }

            if (options.get == undefined) {
                output.createOutputMessage("PL", out);
            } else {
                for (let item in tempObject1) {
                    if (item == options.get) {
                        foundProperty = true;
                        property = tempObject2[item];
                    }
                }
                for (let item in tempObject2) {
                    if (item == options.get) {
                        foundProperty = true;
                        property = tempObject2[item];
                    }
                }

                if (foundProperty) {
                    output.createOutputMessage("PL", `${property}`);
                } else {
                    output.createErrorMessage('PL', `${options.get} is not recognized JSON prope`)
                }
            }

            break;
    }

}

export { execute, handleObjectData };