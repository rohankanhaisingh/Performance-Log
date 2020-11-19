var elements = [];

function createErrorMessage(type, content) {
    var a, b, c, d, e, f;
    a = document.createElement("div");
    a.className = "commandline-output-line line-error blink";

    a.innerHTML = `
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
        a.classList.remove("blink");
    }, 3000);

    elements.push(a);
    append(a);
}

function createWarningMessage(type, content) {
    var a, b, c, d, e, f;
    a = document.createElement("div");
    a.className = "commandline-output-line line-warning blink";

    a.innerHTML = `
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
        a.classList.remove("blink");
    }, 3000);

    elements.push(a);
    append(a);
}

function createInputMessage(type, content) {
    var a, b, c, d, e, f, out = '';
    a = document.createElement("div");
    a.className = 'commandline-output-line';


    switch (type) {
        case "PL":
            b = content.split(" ");
            out += `<code class="pl-command">${b[0]}</code>`;

            c = content.substring(b[0].length + 1).split(" ");
            c.forEach(function (c1) {
                switch (c1.substring(0, 1)) {
                    case "-":
                        out += `<code class="pl-command-arg"> ${c1}</code>`;
                        break;
                    case `"`:
                        out += `<code class="pl-command-string"> ${c1}</code>`;
                        break;
                    default:
                        out += ` ${c1}`;
                        break;
                }
            });

            a.innerHTML = `
        <div class="commandline-output-line-cll-le">
            <div class="commandline-output-line-cll-le-type">
                <span>${type}</span>
            </div>
            <div class="commandline-output-line-cll-le-icon">
                <img src="../icons/icon_arrowright.png" />
            </div>
        </div>

        <div class="commandline-output-line-cll-ri">
            <span>${out}</span>
        </div>
    `;
            break;
        case "PS":
            a.innerHTML = `
        <div class="commandline-output-line-cll-le">
            <div class="commandline-output-line-cll-le-type">
                <span>${type}</span>
            </div>
            <div class="commandline-output-line-cll-le-icon">
                <img src="../icons/icon_arrowright.png" />
            </div>
        </div>

        <div class="commandline-output-line-cll-ri">
            <span>${content}</span>
        </div>
    `;
            break;
        

    }
    elements.push(a);
    append(a);
} 

function createOutputMessage(type, content, cl, contentElements) {
    var a = document.createElement("div"), b, c, d, e, f;
    a.className = 'commandline-output-line line-output';

    if (typeof cl !== 'undefined') {
        if (typeof cl == 'object') {
            for (var i = 0; i < cl.length; i++) {
                a.classList.add(cl[i]);
            }
        }
    }

    b = $gcre("div.commandline-output-line-cll-le", a);
    var bIcon = $gcre("div.commandline-output-line-cll-le-icon", b);
    var bIconImage = $gcre("img", bIcon);
    bIconImage.src = '../icons/icon_arrowleft.png';
    c = $gcre("div.commandline-output-line-cll-ri", a);
    var cSpan = $gcre("span", c);
    cSpan.innerHTML = content;

    if (typeof contentElements !== 'undefined' && typeof contentElements == 'object') {
        for (var i = 0; i < contentElements.length; i++) {
            cSpan.appendChild(contentElements[i]);
        }
    }

    elements.push(a);
    append(a);
}

function append(a) {
    var b = document.querySelector(".commandline-output div");

    b.appendChild(a);
    b.scrollTop = b.scrollHeight * 2;

}

function clearMessages() {
    var i = 0;
    while (i < document.getElementsByClassName("commandline-output-line").length) {
        document.getElementsByClassName("commandline-output-line")[i].remove();
        elements.pop();
        i += 1;
        console.log(i);
    } 
}

export { createErrorMessage, createInputMessage, createOutputMessage, elements, clearMessages, createWarningMessage};