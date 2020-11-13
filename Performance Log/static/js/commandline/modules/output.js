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
    }, 2000);

    elements.push(a);
    append(a);
}

function createInputMessage(type, content) {
    var a, b, c, d, e, f, out = '';
    a = document.createElement("div");
    a.className = 'commandline-output-line';

    b = content.split(" ");
    out += `<code class="pl-command">${b[0]}</code> `;

    c = content.substring(b[0].length + 1).split(" ");
    c.forEach(function (c1) {
        if (c1.substring(0, 1) == '-') {
            d = content.substring(content.indexOf(c1) + c1.length + 1).split(" ")[0];
            if (d.indexOf('"') > -1) {
                out += `<code class="pl-command-arg">${c1}</code> <code class="pl-command-string">${d}</code> `;
            } else {
                out += `<code class="pl-command-arg">${c1}</code> `;
            }
        } else {
            if (c1.indexOf(`"`) == -1) {
                out += `${c1} `;
            }
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
    elements.push(a);
    append(a);
} 

function createOutputMessage(type, content) {
    var a = document.createElement("div");
    a.className = 'commandline-output-line line-output';
    a.innerHTML = `
        <div class="commandline-output-line-cll-le">
            <div class="commandline-output-line-cll-le-icon">
                <img src="../icons/icon_arrowleft.png" />
            </div>
        </div>
        <div class="commandline-output-line-cll-ri">
            <span>${content}</span>
        </div>
    `;
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
    } 
}

export { createErrorMessage, createInputMessage, createOutputMessage, elements, clearMessages};