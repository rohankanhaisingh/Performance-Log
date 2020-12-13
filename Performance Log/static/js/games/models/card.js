/*
 * Yes I know I should use ReactJS to create DOM elements.
 * I need to rewire this entire project if I want to use ReactJS.
 * Maybe in the future, I will change the project to a ReactJS project :).
*/

/**
 * UniqueID
 * @param {number} length
 */
function setUniqueID(length) {
    var a, b, c, d, e, f;
    a = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    b = "";
    if (length !== undefined) {
        for (var i = 0; i < length; i++) {
            c = Math.floor(Math.random() * a.length);
            d = a.charAt(c);
            b += d;
        }
    } else {
        for (var i = 0; i < 12; i++) {
            c = Math.floor(Math.random() * a.length);
            d = a.charAt(c);
            b += d;
        }
    }
    return b;
}

const returnElement = $g(".models-scroller-angle");

class ModelCard {
    #cardElement;
    #cardButtons = [];

    /**
     * Creates a model card.
     * @param {string} name
     * @param {(Array)} type
     * @param {URL} headerImage
     * @param {SocketIO.Client} socket
     * @param {object} options
     * @param options.path
     * @param options.configurate
     * @param options.remove
     */
    constructor(name, type, lastPlayed, headerImage, options, socket) {
        this.name = name;
        this.type = type;
        this.headerImage = headerImage;
        this.options = options;
        this.socket = socket;
        this.lastPlayed = lastPlayed;

        this.Return();
    }
    Return() {
        let card = document.createElement("div");
        card.className = "games-model";
        card.setAttribute("card-name", this.name);
        card.setAttribute("uid", setUniqueID(18));
        card.setAttribute("card-lastplayed", this.lastPlayed);
        
        let cardContainer = document.createElement("div");
        cardContainer.className = "container";
        card.appendChild(cardContainer);

        let cardBackground = document.createElement("div");
        cardBackground.className = "model-background";
        cardBackground.setAttribute("data-source", this.headerImage);
        cardContainer.appendChild(cardBackground);

        let cardBackgroundImage = document.createElement("img");
        cardBackgroundImage.src = this.headerImage;
        cardBackground.appendChild(cardBackgroundImage);

        let cardForeground = document.createElement("div");
        cardForeground.className = 'model-foreground';
        cardContainer.appendChild(cardForeground);

        let cardForegroundContainer = document.createElement("div");
        cardForegroundContainer.className = 'container';
        cardForeground.appendChild(cardForegroundContainer);

        let cardModelImage = document.createElement("div");
        cardModelImage.className = 'model-image';
        cardModelImage.innerHTML = `<img src="${this.headerImage}"/>`;
        cardForegroundContainer.appendChild(cardModelImage);

        let cardModelContent = document.createElement("div");
        cardModelContent.className = 'model-content';
        cardForegroundContainer.appendChild(cardModelContent);

        let cardModelContentButtons = document.createElement("div");
        cardModelContentButtons.className = 'model-content-buttons';
        cardModelContent.appendChild(cardModelContentButtons);

        // Buttons
        if (typeof this.options.path !== "undefined") {
            let playButton = document.createElement("div");
            playButton.className = "model-content-button";
            cardModelContentButtons.appendChild(playButton);

            let playButtonText = document.createElement("div");
            playButtonText.className = "model-content-button-text";
            playButtonText.innerHTML = `<span>PLAY GAME</span>`;
            playButton.appendChild(playButtonText);

            let playButtonImage = document.createElement("img");
            playButtonImage.src = '../icons/icon_play.png';
            playButton.appendChild(playButtonImage);

            playButton.onclick = () => {
                window.open(this.options.path);
            };

            this.#cardButtons.push(playButton);
        }

        if (typeof this.options.configurate !== "undefined") {
            let configButton = document.createElement("div");
            configButton.className = "model-content-button";
            cardModelContentButtons.appendChild(configButton);

            let configButtonText = document.createElement("div");
            configButtonText.className = "model-content-button-text";
            configButtonText.innerHTML = `<span>CONFIGURATE</span>`;
            configButton.appendChild(configButtonText);

            let configButtonImage = document.createElement("img");
            configButtonImage.src = '../icons/icon_edit.png';
            configButton.appendChild(configButtonImage);

            this.#cardButtons.push(configButton);
        }

        let removeButton = document.createElement("div");
        removeButton.className = "model-content-button";
        cardModelContentButtons.appendChild(removeButton);

        let removeButtonText = document.createElement("div");
        removeButtonText.className = "model-content-button-text";
        removeButtonText.innerHTML = `<span>REMOVE CARD</span>`;
        removeButton.appendChild(removeButtonText);

        let removeButtonImage = document.createElement("img");
        removeButtonImage.src = '../icons/icon_bin.webp';
        removeButton.appendChild(removeButtonImage);
        this.#cardButtons.push(removeButton);

        // Events for elements
        removeButton.onclick = event => {
            // Remove the card with a cool animation
            this.#cardElement.classList.add("remove");


            setTimeout(() => {
                this.#cardElement.remove();
            }, 500);
        }

        this.#cardElement = card;
        returnElement.appendChild(this.#cardElement);
    }
}

export { ModelCard };