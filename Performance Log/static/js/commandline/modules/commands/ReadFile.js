import * as output from '../output.js';
import * as sh from '../../socketHandler.js';
import { socket } from '../../index.js';

let savedTextAreas = {};

/**
 * Generates a unique id.
 * @param {any} length
 */
const uniqueid = length => {
    const characters = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let out = "";

    for (let i = 0; i < length; i++) {
        let randomNumber = Math.floor(Math.random() * characters.length);
        let randomChar = characters.charAt(randomNumber);
        out += randomChar;
    }
    return out;
}

/**
 * Executes the ReadFile command.
 * @param {string} command
 */
const execute = command => {

    // Options
    const options = {
        path: undefined,
        writeTo: undefined,
        parseString: false,
        get: undefined,
        storeAs: undefined
    }

    const args = command.split(" "); // Split the command string into white spaces. This will return an array.
    let val;

    // Loop through the array.
    args.forEach(arg => {
        if (arg.substring(0, 1) == '-') {

            // Get the text after the '-' sign.
            let argf = arg.substring(1).split(" ")[0];

            // Check the argf value.
            switch (argf) {
                case "Path":
                    // Get the value after the argument.
                    val = command.substring(command.indexOf(argf) + argf.length + 1).split(" ")[0].split(`"`)[1];

                    options.path = val;
                    break;
                case "WriteTo":
                    // Get the value after the argument.
                    val = command.substring(command.indexOf(argf) + argf.length + 1).split(" ")[0].split(`"`)[1];

                    options.writeTo = val;
                    break;
                case "Parse":
                    // No need to split any of the text for this argument.

                    options.parseString = true;
                    break;
                case "Get":
                    // Get the value after the argument.
                    val = command.substring(command.indexOf(argf) + argf.length + 1).split(" ")[0].split(`"`)[1];

                    options.get = val;
                    break;
                case "StoreAs":
                    // Get the value after the argument.
                    val = command.substring(command.indexOf(argf) + argf.length + 1).split(" ")[0].split(`"`)[1];

                    options.storeAs = val;
                    break;
                default:
                    output.createErrorMessage("PL", `<code class="pl-command">${arg}</code> is not a recognized ReadFile argument. Please enter <code class="pl-command">Help</code> <code class="pl-command-class">ReadFile</code> for more information about this command.`);
                    break;
            }
        }
    });


    // Check if important arguments are attached.
    if (typeof options.path == 'undefined') {
        output.createErrorMessage("PL", "Missing -Path argument with string after.");
    }

    // Create a new XMLHttpRequest object.
    const xhr = new XMLHttpRequest();

    // Event listener when the state of the XHR object has been changed.
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) { // If the state is equal to 4.
            if (this.status == 200) { // If the response status is equal to 200 (or mostly OK).

                // Handle the response text using the options.

                // If the user want to parse the text and to get a specific property.
                if (options.parseString) {
                    if (typeof options.get !== 'undefined') {
                        let parsedText = JSON.parse(this.responseText)[options.get];

                        if (typeof parsedText !== 'undefined') {
                            output.createOutputMessage("PL", `${parsedText}`);
                        } else {
                            output.createErrorMessage("PL", `Property <code class="pl-command-string">${parsedText.get}</code> is not a recognized JSON property in this file.`);
                        }

                    }
                } else {
                    // Create a new text area.
                    const textAreaElement = $gcre("div.pl-output-textarea");

                    textAreaElement.innerText = this.responseText;
                    textAreaElement.contentEditable = true;
                    textAreaElement.setAttribute("t-id", uniqueid(12));

                    // Check if the storeAs variable already exist. If it does, it will return a error. If it doesn't, it will store the textarea into a variable.
                    if (typeof options.storeAs !== 'undefined') {
                        if (typeof savedTextAreas[options.storeAs] == 'undefined') {

                            // Add a new object to the savedTextAreas object.
                            savedTextAreas[options.storeAs] = {
                                element: textAreaElement,
                                content: textAreaElement.innerText,
                                path: options.path
                            };

                            // Change the value when the user typed something in.
                            textAreaElement.addEventListener("input", function () {
                                savedTextAreas[options.storeAs].content = this.innerText;
                            });

                        } else {
                            // Return a error if the variable already exist.

                            output.createErrorMessage("PL", `Text field named ${c.storeAs} already exist. Please enter <code class="pl-command">${c.storeAs}</code> <code class="pl-command-arg">-Remove</code> to remove this variable.`)
                        }
                    }
                    
                    output.createOutputMessage("PL", null, "textArea", [textAreaElement]);
                }
            } else {
                // Return a error if the file cannot be found because of a invalid path.

                output.createErrorMessage("PL", `The file <code class="pl-command-string">"${options.path}"</code> cannot be found. Did you forget anything to add?.`);
                return;
            }
        }
    }
    if (typeof options.path !== 'undefined') {
        xhr.open("GET", options.path, true);
        xhr.send(null);
    }
}

/**
 * Handle text area.
 * @param {string} command
 * @param {object} obj
 */
const handleTextInput = (command, obj) => {
    let textArea = obj.element;
    let textContent = obj.content;
    let filePath = obj.path;
    let commandLineInput = $g(".container in .commandline-output")
    let args = command.split(" ");

    // Blink and scroll to the element.
    textArea.classList.add("blink");
    commandLineInput.scroll({
        top: obj.element.offsetTop,
        behavior: "smooth"
    });

    // Remove the blink effect.
    setTimeout(() => { textArea.classList.remove("blink"); }, 2000);


    for (let arg in args) {

        // Check if the first character of the argument starts with a '-'.
        if (arg.substring(0, 1) == "-") {

            // Check the actual argument.
            switch (arg.substring(1)) {
                case "Save":

                    // Send the value to the server and let it save the file.
                    sh.emit(socket, "saveFile", obj);

                    // Ouput
                    output.createOutputMessage("PL", `File has been saved at ${new Date()} to ${obj.path}`);
                    break;
                case "Remove":
                    
                    break;
                default:
                    // Return a error if the argument is not recognized.

                    output.createErrorMessage("PL", `<code class="pl-command-arg">${arg}</code> is not a recognized argument for this variable.`);
                    break;
            }
        }
    }
}

export { execute, savedTextAreas, handleTextInput };