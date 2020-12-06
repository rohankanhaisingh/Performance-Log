/*
 * I had to make this entire document looks clean. I am used to name give variables simple names like a, b, c or something like that.
 * But since I decided to make this project opensource, I have to make sure that others can read the code without figuring out what it does.
 */

import * as plCommandHandler from './plCommandHandler.js';

// Set input events that will be used later :).
let inputEvents = {
    focus: false,
    typing: false,
    content: "",
    isOverCommandList: false,
    isSelecting: false
}


const commandList = $g(".commandline-input-list");
const commandLineInputContainer = $g(".commandline-input-textfield");

// Event when the user is hovering over the commandlist.
commandList.On("mouseover", function () {
    inputEvents.isOverCommandList = true;
});

// Event when the user stopped hovering over the commandlist.
commandList.On("mouseout", function () {
    inputEvents.isOverCommandList = false;
});

const elements = []; // Empty elements array.

let itemSelector = 0;
let itemLength = 0; // Item length.
let itemArray = [];

/**
 * Load the commands
 * @param {HTMLDivElement} inputElement
 */
const loadCommandListFile = (inputElement) => {
    // Opens the commands JSON file.
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // If the status is equal to 200 and the readyState result is equal to 4
                let parsedText = JSON.parse(this.responseText);

                for (var item in parsedText) {
                    if (typeof parsedText[item]['commandListItems'] !== 'undefined') {

                        // I had no idea what else I could name this variable, so I just used 'c'. 
                        for (var c in parsedText[item]['commandListItems']) createCommandListItem(parsedText[item]['commandListItems'][c], inputElement);
                    }
                }
            }
        }
    }

    xhr.open("get", "../js/commandline/modules/commands/commands.json"); // Request the actual file
    xhr.send(null); // I want no body header being sent.
}

/**
 * Creates a commandlist item.
 * @param {string} command
 * @param {HTMLDivElement} inputElement
 */
const createCommandListItem = (command, inputElement) => {
    let keyWord, everythingNextToKeyword, args, strings, mainText = command.split(" "), out = "";

    keyWord = mainText[0]; // Get the first word.
    everythingNextToKeyword = command.substring(keyWord.length + 1); // Get everything after the first word.

    let item = $gcre("div.commandline-input-list-item", ".container in .commandline-input-list"); // Create a new item element.
    let itemContent = $gcre("div.commandline-input-list-item-content", item); // Creates a item container.
    let itemContentSpan = $gcre("span", itemContent);

    // Event when the user pressed the item.
    item.onclick = function () {
        inputElement.innerHTML = command; // Write the pressed command in the inputfield.
        inputElement.focus(); // Focus the inputfield.

        commandLineInputContainer.AddClass("blink"); // Add a cool blink effect.

        commandList.RemoveClass("visible"); // Hide the commandlist.

        // Remove the blink effect after 300 milliseconds.
        setTimeout(function () {
            commandLineInputContainer.RemoveClass("blink");
        }, 300);
    }

    itemContentSpan.innerHTML = `<code class="pl-command">${keyWord}</code> ${everythingNextToKeyword}`;

    itemArray.push(item); // Add the item in this array.
    elements.push(item); // Add the item in the elements array.
}

/**
 * Starts adding event listeners when the client (user) got connected to the server.
 * @param {HTMLDivElement} element
 */
const listen = (element) => {
    if (typeof element !== 'undefined') { // Check if the element argument is not undefined.1
        if (element instanceof HTMLDivElement) { // Check if the element argument is a of the HTMLDivElement class.

            loadCommandListFile(element); // Load the commands.

            // Input when the user is focussing on the input field.
            element.addEventListener("focusin", function () {
                inputEvents.focus = true;

                // Show the commandlist if the user is focussing on the element and if the text is not empty.
                if (this.innerText !== '') {
                    commandList.AddClass("visible");
                }

            });

            // Event when the user stopped focussing on the input field.
            element.addEventListener("focusout", function () {
                inputEvents.focus = false;
                if (this.innerText !== '' && !inputEvents.isOverCommandList) {
                    commandList.RemoveClass("visible");
                }
            });

            // Event when the user is pressing any button.
            element.addEventListener("keydown", function (event) {

                // Check if the user pressed a specific button.
                switch (event.keyCode) {
                    case 13:
                        // If the user pressed on enter.

                        // If the user is not selecting in the command list.
                        if (!inputEvents.isSelecting) {
                            plCommandHandler.handle(this.innerText); // Handle the command.
                            //console.log(this.innerText);

                            this.innerText = ""; // Clear the input field.
                        } else {
                            // If the user is selecting in the commandlist.

                            itemArray[itemSelector].click();
                        }

                        event.preventDefault(); // Prevent the input creating a new inline text rule.
                        break;
                    case 38:
                        // If the user pressed the arrow up button.

                        if (!inputEvents.isSelecting) {
                            inputEvents.isSelecting = true;
                        }

                        // If the itemSelector number is greater than 0.
                        if (itemSelector > 0) {
                            itemSelector -= 1; // Decrease number.
                        }

                        // Loop though the item array.
                        for (let i = 0; i < itemArray.length; i++) {

                            // If the itemselector number is equal to i.
                            if (i == itemSelector) {
                                itemArray[i].classList.add("focus");

                                if (itemArray[i].offsetTop < commandList.scrollTop) {
                                    commandList.scroll({
                                        behavior: "smooth",
                                        top: itemArray[i].offsetTop
                                    });
                                }
                            } else {
                                itemArray[i].classList.remove("focus");
                            }
                        }

                        event.preventDefault(); // Prevent the input to do... ehh... idk stupid stuff?
                        break;
                    case 40:
                        // If the user pressed the arrow down button.

                        // If the itemSelector number is less than the itemLength array.
                        if (!inputEvents.isSelecting) {
                            inputEvents.isSelecting = true;
                        }

                        // If the itemSelector number is greater than 0.
                        if (itemSelector < itemArray.length) {
                            itemSelector += 1; // Decrease number.
                        }

                        // Loop though the item array.
                        for (let i = 0; i < itemArray.length; i++) {

                            // If the itemselector number is equal to i.
                            if (i == itemSelector) {
                                itemArray[i].classList.add("focus");

                                if (itemArray[i].offsetTop > commandList.scrollTop) {
                                    commandList.scroll({
                                        behavior: "smooth",
                                        top: itemArray[i].offsetTop
                                    });
                                }
                            } else {
                                itemArray[i].classList.remove("focus");
                            }
                        }

                        event.preventDefault();
                        break;
                    case 27:
                        if (inputEvents.isSelecting) {
                            for (let i = 0; i < itemArray.length; i++) {
                                itemArray[i].classList.remove("focus");
                            }

                            inputEvents.isSelecting = false;
                            commandList.RemoveClass("visible");
                        }
                        break;
                }

                // Show the commandlist if the inputfield is not empty.
                if (this.innerText == '') {
                    commandList.RemoveClass("visible");
                }
            });

            // Event when the inputfield has some changes.
            element.addEventListener("input", function () {
                let value = this.innerText.toLowerCase(); // Change the value of the input to lowercase letters.
                let temporaryArray = []; // Create a temporary empty array.

                if (value !== '') {
                    // Show the commandlist if the inputfield is not empty.
                    commandList.AddClass("visible");
                }

                // Loop though the elements array.
                for (let i = 0; i < elements.length; i++) {
                    let itemText = elements[i].innerText.toLowerCase(); // Get the text from the items and change it to lower case letters.

                    if (itemText.indexOf(value) > -1) {
                        itemLength += 1;
                        temporaryArray.push(elements[i]);
                        elements[i].classList.remove("hidden");
                    } else {
                        elements[i].classList.add("hidden");
                    }
                }

                itemArray = temporaryArray;
            });
        }
    }
};

export { listen, inputEvents };