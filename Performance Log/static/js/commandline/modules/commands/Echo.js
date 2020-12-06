import * as output from '../output.js';
import * as sh from '../../socketHandler.js';
import { socket } from '../../index.js';


/**
 * Copied from https://stackoverflow.com/questions/19793221/javascript-text-between-double-quotes
 * Extract every string.
 * @param {string} str
 */
const extractAllText = str => {
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
 * 
 * @param {string} command
 */
const execute = command => {

    let splitText = extractAllText(command);
    let args = command.split(" ");
    let options = {
        color: undefined,
        background: undefined,
        text: extractAllText(command)[0]
    }
    let argValue;

    for (let i = 0; i < args.length; i++) {
        let arg = args[i];
        if (arg.substring(0, 1) == '-') {
            let argName = arg.substring(1);

            switch (argName) {
                case "Color":
                    argValue = command.substring(command.indexOf(argName) + argName.length + 1).split(" ")[0].split(`"`)[1];

                    options.color = argValue;
                    break;
                case "Background":
                    argValue = command.substring(command.indexOf(argName) + argName.length + 1).split(" ")[0].split(`"`)[1];

                    options.background = argValue;
                    break;
                default:
                    output.createErrorMessage("PL", `${arg} is not a recognized argument for this command`);
                    break;
            }
        }
    }

    if (typeof options.text !== 'undefined') {
        if (options.text.substring(0, 1) == '$') {
            // Javascript execution.

            let parsedOptions = JSON.stringify(options);
            output.createOutputMessage("PL", `<code style="color: ${options.color}; background: ${options.background};">${eval(options.text.substring(1))}</code>`);
        } else {
            let parsedOptions = JSON.stringify(options);
            output.createOutputMessage("PL", `<code style="color: ${options.color}; background: ${options.background};">${options.text}</code>`);
        }
    }
}

export { execute };