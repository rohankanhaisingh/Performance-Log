const elements = [];

/**
 * Creates a error message.
 * @param {("PL" | "PS" | "BC" | "ST" | "NK")} type Type of the message. Default is PL
 * @param {string} content Message content.
 */
const createErrorMessage = (type, content) => {
    const element = document.createElement("div");
    element.className = "commandline-output-line line-error blink";

    element.innerHTML = `
        <div class="commandline-output-line-cll-le">
            <div class="commandline-output-line-cll-le-icon">
                <img src="../icons/icon_arrowleft.png" />
            </div>
        </div>

        <div class="commandline-output-line-cll-ri">
            <span><code class="pl-log-error">${content}</code></span>
        </div>
    `;

    setTimeout(function () {
        element.classList.remove("blink");
    }, 3000);

    elements.push(element);
    append(element);
}

/**
 * Creates a warning message.
 * @param {("PL" | "PS" | "BC" | "ST" | "NK")} type Type of the message. Default is PL
 * @param {string} content Message content.
 */
const createWarningMessage = (type, content) => {
    const element = document.createElement("div");
    element.className = "commandline-output-line line-warning blink";

    element.innerHTML = `
        <div class="commandline-output-line-cll-le">
            <div class="commandline-output-line-cll-le-icon">
                <img src="../icons/icon_arrowleft.png" />
            </div>
        </div>

        <div class="commandline-output-line-cll-ri">
            <span><code>${content}</code></span>
        </div>
    `;

    setTimeout(function () {
        element.classList.remove("blink");
    }, 3000);

    elements.push(element);
    append(element);
}

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
 * Creates and styles the input message.
 * @param {("PL" | "PS" | "BC" | "ST" | "NK")} type Type of the message. Default is PL
 * @param {string} content Message content.
 */
const createInputMessage = (type, content) => {
    let out = "", element, args, strings, index = 0;

    let keyWord = content.split(" ")[0];   
    out += `<code class="pl-command">${keyWord} </code>`;

    args = content.substring(keyWord.length + 1).split(" ");
    strings = extractAllText(args);


    for (let item in args) {
        let arg = args[item];

        switch (arg.substring(0, 1)) {
            case "-":
                // If the character is a minus symbol.

                out += `<code class="pl-command-arg"> ${arg} </code>`;
                break;
            case `"`:
                // If the character is a quote symbol.

                let str = strings[index];

                // Check every characters of the string to check if the character is a comma or not.
                for (let i = 0; i < str.length; i++) {
                    if (str.charAt(i) == ',') {
                        // Replace the comma with a white space.
                        str = str.replace(",", " ");
                    }
                }

                out += `<code class="pl-command-string">"${str}" </code>`;

                index += 1;
                break;
            default:
                // If none of these cases matches.

                //console.log(arg);

                //out += arg;

                break;
        }
    }

    element = $gcre("div.commandline-output-line line-output");

    let iconMain = $gcre("div.commandline-output-line-cll-le", element);
    let iconContainer = $gcre("div.commandline-output-line-cll-le-icon", iconMain);
    let iconContainerImage = $gcre("img", iconContainer);
    iconContainerImage.src = '../icons/icon_arrowright.png';

    let text = $gcre("div.commandline-output-line-cll-ri", element);
    var textSpan = $gcre("span", text);

    textSpan.innerHTML = out;

    append(element);
} 

/**
 * Creates a default output message.
 * @param {("PL" | "PS" | "BC" | "ST" | "NK")} type Type of the message. Default is PL
 * @param {string} content Message content.
 * @param {object} cl Any other classnames to add.
 * @param {HTMLElement} contentElements Other html elements that can be attached to the message.
 */
const createOutputMessage = (type, content, cl, contentElements) => {
    let element = document.createElement("div"), b, c, d, e, f;
    element.className = 'commandline-output-line line-output';

    if (typeof cl !== 'undefined') {
        if (typeof cl == 'object') {
            for (var i = 0; i < cl.length; i++) {
                element.classList.add(cl[i]);
            }
        }
    }

    b = $gcre("div.commandline-output-line-cll-le", element);
    var bIcon = $gcre("div.commandline-output-line-cll-le-icon", b);
    var bIconImage = $gcre("img", bIcon);
    bIconImage.src = '../icons/icon_arrowleft.png';
    c = $gcre("div.commandline-output-line-cll-ri", element);
    var cSpan = $gcre("span", c);
    cSpan.innerHTML = content;

    if (typeof contentElements !== 'undefined' && typeof contentElements == 'object') {
        for (var i = 0; i < contentElements.length; i++) {
            cSpan.appendChild(contentElements[i]);
        }
    }

    elements.push(element);
    append(element);
}

/**
 * Attach the element to the console.
 * @param {HTMLDivElement} element
 */
const append = element => {
    var main = document.querySelector(".commandline-output div");

    main.appendChild(element);
    main.scrollTop = main.scrollHeight * 2;

}

/**
 * Remove all the messages. 
*/
const clearMessages = () => {
    var i = 0;
    while (i < document.getElementsByClassName("commandline-output-line").length) {
        document.getElementsByClassName("commandline-output-line")[i].remove();
        elements.pop();
        i += 1;
    } 
}

export { createErrorMessage, createInputMessage, createOutputMessage, elements, clearMessages, createWarningMessage};