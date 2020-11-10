(function (a) {
    /*
 * g.js Copyright 2019-2020 ©.
 *  
 * - - - - - - - - 
 *
 * Made by Rohan Kanhaisingh.
 * Check out https://github.com/rohankanhaisingh
 */
    var a, b, c, d, e, f;
    var dx_lang = {
        'nl': {
            accept: 'OK',
            cancel: 'Annuleren',
            title: 'vertelt',
            alert_title: 'meldt als volgende'
        },
        'en': {
            accept: 'OK',
            cancel: 'Cancel',
            title: 'says',
            alert_title: 'report as following'
        },
        'fr': {
            accept: 'OK',
            cancel: 'Annuler',
            title: 'dit',
            alert_title: 'signaler comme suit'
        },
        'es': {
            accept: 'OK',
            cancel: 'Cancelar',
            title: 'dice',
            alert_title: 'informar de la siguiente manera'
        },
        'de': {
            accept: 'OK',
            cancel: 'Abbrechen',
            title: 'sagt',
            alert_title: 'bericht wie folgt'
        },
        'sl': {
            accept: 'OK',
            cancel: 'zrušiť',
            title: 'hovorí',
            alert_title: 'Nahlásiť nasledujúcu správu'
        }
    };
    var notification_elements = [];
    a = window || document.window;
    (function () {
        !function () { if (typeof window !== 'undefined') { return this; } else if (typeof window == 'undefined' && typeof document == 'undefined') throw new Error("g.js require a interactive document"); }(); window.Width = window.innerWidth; window.Height = window.innerHeight; window.onresize = () => { window.Width = window.innerWidth; window.Height = window.innerHeight; }; document.GetElement = (element, elementTarget) => { return g.Selector(element, elementTarget); };
    })();
    a.RandomBetween = function (value1, value2) {
        if (typeof value1 == 'undefined') {
            throw new Error(`${value1} is not undefined.`);
            return;
        }
        if (typeof value2 == 'undefined') {
            throw new Error(`${value2} is undefined.`);
            return;
        }

        if (typeof value1 !== 'number') {
            throw new Error(`${value1} is not a number.`);
            return;
        }
        if (typeof value2 !== 'number') {
            throw new Error(`${value2} is not a number.`);
            return;
        }

        var a = Math.floor(Math.random() * (value1 - value2) + value2);
        return a;
    }

    var _0xd5c0 = ["\x54\x6F\x49\x6E\x74", "\x70\x72\x6F\x74\x6F\x74\x79\x70\x65"]; String[_0xd5c0[1]][_0xd5c0[0]] = function () { return parseInt(this) }
    var _0xc525 = ["\x54\x6F\x46\x6C\x6F\x61\x74", "\x70\x72\x6F\x74\x6F\x74\x79\x70\x65"]; String[_0xc525[1]][_0xc525[0]] = function () { return parseFloat(this) }
    var _0xc889 = ["\x72\x61\x6E\x64\x6F\x6D", "\x5F\x5F\x70\x72\x6F\x74\x6F\x5F\x5F", "\x69\x6E\x6E\x65\x72\x57\x69\x64\x74\x68", "\x66\x6C\x6F\x6F\x72"]; window[_0xc889[2]][_0xc889[1]][_0xc889[0]] = function () { return Math[_0xc889[3]](Math[_0xc889[0]]() * this) }
    var _0x5f3b = ["\x72\x61\x6E\x64\x6F\x6D", "\x5F\x5F\x70\x72\x6F\x74\x6F\x5F\x5F", "\x69\x6E\x6E\x65\x72\x48\x65\x69\x67\x68\x74", "\x66\x6C\x6F\x6F\x72"]; window[_0x5f3b[2]][_0x5f3b[1]][_0x5f3b[0]] = function () { return Math[_0x5f3b[3]](Math[_0x5f3b[0]]() * this) }

    a.g = {
        DefineNames: function (boolean) {
            var boolean;
            if (typeof boolean == "boolean") {
                if (typeof document !== "undefined") {
                    var a = {};
                    for (var i = 0; i < document.getElementsByTagName("*").length; i++) {
                        var b = document.getElementsByTagName("*")[i];
                        if (b.getAttribute("g-name") !== null && b.getAttribute("g-name") !== undefined) {
                            a[b.getAttribute("g-name")] = b;
                        }
                    }
                    for (c in a) {
                        window[c] = a[c];
                    }
                }
            }
            else {
                console.log("The argument has to be a boolean");
            }
        },
        Help: function (name) {
            var name, a;
            if (typeof name !== "undefined") {
                a = name.toLowerCase();
                if (a == 'selector') {
                    var b = new XMLHttpRequest();
                    b.onreadystatechange = function () {
                        if (b.readyState === 4) {
                            if (b.status === 200 || b.status == 0) {
                                var text = b.responseText;
                                console.log(text);
                            }
                        }
                    }
                    b.open("GET", 'g_help/g_selector.txt', true);
                    b.send(null);
                    b.onloadend = function () {
                        if (b.status == 404) {
                            throw 'Something wrong happened';
                        }
                    }
                }
            } else {

            }
        },
        Highlight: function (target, timeout, duration) {
            var target, timeout, duration;
            if (duration == "" || duration == undefined) {
                duration = 4e3;
            }
            if (timeout == "" || timeout == undefined) {
                timeout = true;
            }
            if (typeof (target) == "string") {
                if (target.indexOf(".") > -1) {
                    var a = target.substring(target.indexOf(".") + 1);
                    for (var i = 0; i < document.body.getElementsByClassName(a).length; i++) {
                        document.getElementsByClassName(a)[i].classList.add("gx-highlight");
                    }
                    if (typeof (timeout) == "boolean") {
                        if (timeout == true) {
                            setTimeout(function () {
                                for (var i = 0; i < document.body.getElementsByClassName(a).length; i++) {
                                    document.getElementsByClassName(a)[i].classList.remove("gx-highlight");
                                }
                            }, duration);
                        }
                    }
                }
                if (target.indexOf("#") > -1) {
                    var a = target.substring(target.indexOf("#") + 1);
                    document.getElementById(a).classList.add('gx-highlight');
                    if (typeof (timeout) == "boolean") {
                        if (timeout == true) {
                            setTimeout(function () {
                                document.getElementById(a).classList.remove("gx-highlight");
                            }, duration);
                        }
                    }
                }
                if (target.indexOf("<") > -1 && target.indexOf(">") > -1) {
                    var a = target.substring(target.indexOf("<") + 1, target.indexOf(">"));
                    for (var i = 0; i < document.body.getElementsByTagName(a).length; i++) {
                        document.getElementsByTagName(a)[i].classList.add("gx-highlight");
                    }
                    if (typeof (timeout) == "boolean") {
                        if (timeout == true) {
                            setTimeout(function () {
                                for (var i = 0; i < document.body.getElementsByTagName(a).length; i++) {
                                    document.getElementsByTagName(a)[i].classList.remove("gx-highlight");
                                    if (document.getElementsByTagName(a)[i].getAttribute("class") == null || document.getElementsByTagName(a)[i].getAttribute("class") == '') {
                                        document.getElementsByTagName(a)[i].removeAttribute("class");
                                    }
                                }
                            }, duration);
                        }
                    }
                }
            }
            if (typeof (target) == "object") {
                target.classList.add("gx-highlight");
                if (typeof (timeout) == "boolean") {
                    if (timeout == true) {
                        setTimeout(function () {
                            target.classList.remove("gx-highlight");
                        }, duration);
                    }
                }
            }
        },
        All: function (element) {
            var element, a, b, c, d;
            if (typeof element !== 'undefined') {
                b = new Array();

                if (element.substring(0, 1) == '.') {
                    a = element.substring(element.indexOf(".") + 1);
                    for (var i = 0; i < document.getElementsByClassName(a).length; i++) {
                        b.push(document.getElementsByClassName(a)[i]);
                    }
                    return y(b);
                }
                else if (element.substring(0, 1) == '#') {
                    a = element.substring(element.indexOf("#") + 1);
                    for (var i = 0; i < document.body.getElementsByTagName("*").length; i++) {
                        c = document.body.getElementsByTagName("*")[i];
                        if (c.getAttribute('id') == a) {
                            b.push(c);
                        }
                    }
                    return y(b);
                }
                if (element.substring(0, 1) == '<' && element.indexOf(">") > -1) {
                    a = element.substring(element.indexOf("<") + 1, element.indexOf(">"));
                    for (var i = 0; i < document.getElementsByTagName(a).length; i++) {
                        b.push(document.getElementsByTagName(a)[i]);
                    }
                    return y(b);
                }
                function y(c) {
                    if (c.length !== 0) {
                        c.Random = () => {
                            d = c[Math.floor(Math.random() * c.length)];
                            return d;
                        }
                        c.Css = (param, property) => {
                            if (param !== undefined && property !== undefined) {
                                for (var i = 0; i < c.length; i++) {
                                    c[i].style.setProperty(param, property);
                                }
                            }
                        }
                        c.SetAttribute = (name, value) => {
                            var name, value;
                            if (name !== undefined && value !== undefined) {
                                for (var i = 0; i < c.length; i++) {
                                    c[i].setAttribute(name, value);
                                }
                            }
                        }
                        c.RemoveAttribute = (name) => {
                            var name;
                            if (name !== undefined) {
                                for (var i = 0; i < c.length; i++) {
                                    c[i].removeAttribute(name);
                                }
                            }
                        }
                        c.Attribute = (val) => {
                            var val, a, b, d, e, f;
                            if (val !== undefined) {
                                if (val.substring(0, 1) == '.') {
                                    // set default classname
                                    a = val.substring(1);
                                    for (var i = 0; i < c.length; i++) {
                                        c[i].className = a;
                                    }
                                }
                                else if (val.substring(0, 1) == '#') {
                                    // set default id
                                    a = val.substring(1);
                                    for (var i = 0; i < c.length; i++) {
                                        c[i].setAttribute("id", a);
                                    }
                                }
                            }
                        }
                        return c;
                    }
                }
            } else {
                throw "Uncaught TypeError: Failed to execute 'All' on 'G': 1 argument required, but only 0 present";
                return;
            }
        },

        /**
         * Advanced element selector.
         * 
         * @param {string} element
         * @param {number} elementTarget
         */
        Selector(element, elementTarget) {
            var element, a, b, elementTarget;
            var d;

            if (typeof (element) == 'string') {
                if (element !== undefined || element !== "") {
                    if (element.indexOf(" ") > -1 && element.indexOf("in") > -1) {
                        if (elementTarget == undefined || elementTarget == "") elementTarget = 0;
                        var sp = element.split(" ");
                        var a = sp[0]; // parent element
                        var b = sp[2]; // child element
                        var c, d, f, e, h;
                        if (typeof b !== "undefined") {
                            if (b.substring(0, 1) == '.') {
                                c = document.getElementsByClassName(b.substring(1))[0];
                            }
                            if (b.substring(0, 1) == '#') {
                                c = document.getElementById(b.substring(1));
                            }
                            if (b.substring(0, 1) == '<' && b.substring(b.length - 1, b.length) == '>') {
                                h = b.substring(b.indexOf("<") + 1, b.indexOf(">"));
                                c = document.getElementsByTagName(h)[0];
                            }
                        }
                        if (typeof a !== 'undefined') {
                            if (typeof c !== "undefined") {
                                if (a.substring(0, 1) == ".") {
                                    for (var i = 0; i < c.getElementsByClassName(a.substring(1)).length; i++) {
                                        if (typeof c.getElementsByClassName(a.substring(1))[i] !== 'undefined') {
                                            e = c.getElementsByClassName(a.substring(1))[elementTarget];
                                            if (typeof e !== "undefined") {
                                                d = e;
                                                return y(d);
                                            }
                                        }
                                    }
                                }
                                if (a.substring(0, 1) == '<' && a.substring(a.length - 1, a.length) == '>') {
                                    f = a.substring(a.indexOf("<") + 1, a.indexOf(">"));
                                    for (var i = 0; i < c.getElementsByTagName(f).length; i++) {
                                        if (typeof c.getElementsByTagName(f)[i] !== 'undefined') {
                                            e = c.getElementsByTagName(f)[elementTarget];
                                            if (typeof e !== "undefined") {
                                                d = e;
                                                return y(d);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (elementTarget == undefined || elementTarget == "") elementTarget = 0;

                        if (element.substring(0, 1) == '.') {
                            a = element.substring(1);
                            b = document.getElementsByClassName(a)[elementTarget];
                            d = b;
                            return y(d);
                        }
                        else if (element.substring(0, 1) == '#') {
                            a = element.substring(1);
                            b = document.getElementById(a);
                            d = b;
                            return y(d);
                        }
                        if (element.substring(0, 1) == '<' && element.substring(element.length - 1) == '>') {
                            a = element.substring(element.indexOf("<") + 1, element.indexOf(">"));
                            b = document.getElementsByTagName(a)[elementTarget];
                            d = b;
                            return y(d);
                        }
                        else if (element.substring(0, 1) == '[' && element.substring(element.length - 1) == ']') {
                            a = element.substring(1, element.length - 1).split("=");
                            b = [];
                            for (var i = 0; i < document.getElementsByTagName("*").length; i++) {
                                if (document.getElementsByTagName("*")[i].getAttribute(a[0])) {
                                    if (document.getElementsByTagName("*")[i].getAttribute(a[0]) == a[1]) {
                                        b.push(document.getElementsByTagName("*")[i]);
                                    }
                                }
                            }
                            return y(b[elementTarget]);
                        }
                    }
                }
                else {
                    return "Can not find a undefined element";
                }
            }
            else if (typeof (element) == 'object') {
                return element;
            }
            function y(h) {
                if (d !== undefined) {
                    h.On = function (event, func) {
                        var event, func;
                        if (typeof d !== 'undefined') {
                            if (typeof event !== 'undefined') {
                                if (typeof event == 'string') {
                                    d.addEventListener(event, func);
                                }
                                if (typeof event == "object") {
                                    d.addEventListener(event, func);
                                }
                            }
                        }
                    };
                    h.Css = function (param, property) {
                        var param, property;
                        if (typeof d !== 'undefined') {
                            if (param !== undefined && property !== undefined) {
                                d.style.setProperty(param, property);
                            }
                        }
                    };
                    h.Width = function (val) {
                        var val;
                        if (val !== undefined) {
                            d.style.width = val;
                        } else if (val == undefined) {
                            return d.clientWidth;
                        }
                    };
                    h.Height = function (val) {
                        var val;
                        if (val !== undefined) {
                            d.style.height = val;
                        } else if (val == undefined) {
                            return d.clientHeight;
                        }
                    };
                    h.Class = (val) => {
                        var val;
                        if (val !== undefined) {
                            d.className = val;
                        } else if (val == undefined) {
                            return d.className;
                        }
                    }
                    h.AddClass = function (name) {
                        var name;
                        if (typeof this !== 'undefined') {
                            if (this instanceof HTMLElement) {
                                if (name !== undefined) {
                                    this.classList.add(name);
                                }
                            }
                        }
                    }
                    h.RemoveClass = function (name) {
                        var name;
                        if (typeof this !== 'undefined') {
                            if (this instanceof HTMLElement) {
                                if (name !== undefined) {
                                    this.classList.remove(name);
                                }
                            }
                        }
                    }
                    h.Style = (obj) => {
                        var obj;
                        if (typeof obj !== "undefined") {
                            for (a in obj) {
                                d.style[a] = obj[a];
                            }
                        } else {
                            return d.style == null ? d.style : getComputedStyle(d)
                        }
                    }
                    h.Click = (call) => {
                        var call;
                        if (typeof call !== "undefined") {
                            d.onclick = call;
                        } else {
                            d.click();
                        }
                    }
                    h.HasClass = function(classname) {
                        var a, b = false, c, d, e, classname;
                        if (typeof this !== 'undefined') {
                            if (this instanceof HTMLElement) {
                                this.classList.forEach(function (a) {
                                    if (a == classname) {
                                        b = true;
                                    }
                                });
                                return b;
                            }
                        }
                    }

                    /**
                     * @description Check the type of the element.
                     * @param {GeneratorFunction} instance 
                     */
                    h.Is = function (instance) {
                        var instance, a, b, c, d;
                        if (typeof instance !== 'undefined') {
                            if (typeof instance == 'function') {
                                try {
                                    return h instanceof instance;
                                } catch (err) {
                                    throw new Error(err.message);
                                }
                            }
                        }
                    }
                }
                return h;
            }
        },
        Define: function (element, defineName) {
            var element, defineName;
            if (typeof element !== "undefined" && typeof defineName !== "undefined") {
                if (element == 'all') {
                    for (var i = 0; i < document.getElementsByTagName("*").length; i++) {
                        if (document.getElementsByTagName("*")[i].getAttribute("class") !== null) {
                            console.log(true);
                            window[document.getElementsByTagName("*")[i].getAttribute("class")] = document.getElementsByTagName("*")[i];
                        }
                    }
                } else {
                    window[defineName] = element;
                    return window[defineName];
                }
            }
        },
        XHLoad: function (filepath, callback) {
            var filepath, callback, a, b, c, d, e, events;
            a = new XMLHttpRequest();
            b = (new Date()).getTime();
            a.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if (this.status == 200) {
                        c = (new Date().getTime());
                        if (typeof callback !== "undefined") {
                            callback(
                                response = {
                                    text: this.responseText,
                                    code: this.status,
                                    main: this,
                                    time: {
                                        start: b,
                                        end: c,
                                        difference: c - b
                                    },
                                    fileSize: this.getResponseHeader("content-length"),
                                    speed: {
                                        mbps: Math.round(this.getResponseHeader("content-length") / Math.round((c - b) / 10) / 1000),
                                        kbps: Math.round(this.getResponseHeader("content-length") / Math.round((c - b) / 10) / 1),
                                        mbs: (Math.round(this.getResponseHeader("content-length") / Math.round((c - b) / 10) / 1000)) / 8,
                                        kbs: (Math.round(this.getResponseHeader("content-length") / Math.round((c - b) / 10) / 1)) / 8
                                    },
                                    headers: this.getAllResponseHeaders()
                                }
                            );
                        }
                    }
                    if (this.status !== 200) {
                        if (typeof callback !== "undefined") {
                            callback(
                                response = {
                                    text: this.status,
                                    code: this.status,
                                    main: this.status
                                }
                            );
                        }
                    }
                }
            });
            a.onerror = function () {
                console.error("An error has occurred");
            }
            for (e in events) {
                a[e] = events[e];
            }
            a.open("GET", filepath, true);
            a.send(null);
        },
        CreateElement: function (element, returnElement) {
            var element, returnElement, a, b, c, d, e, f, h, i, j, k;
            if (typeof element !== 'undefined' && element !== '') {
                if (element.indexOf(".") > -1 && element.indexOf("#") == -1) {
                    a = element.split(".");
                    c = [];
                    for (b in a) c.push(a[b]);
                    if (c.length == 2) {
                        d = c[0];
                        e = c[1];
                    }
                    f = document.createElement(d); f.className = e;
                    return tE(f);
                }
                if (element.indexOf("#") > -1 && element.indexOf(".") == -1) {
                    a = element.split("#");
                    c = [];
                    for (b in a) c.push(a[b]);
                    if (c.length == 2) {
                        d = c[0];
                        e = c[1];
                    }
                    f = document.createElement(d); f.id = e;
                    return tE(f);
                }
                if (element.indexOf("#") == -1 && element.indexOf(".") == -1) {
                    f = document.createElement(element);
                    return tE(f);
                }
            }
            function tE(r) {
                var r, t, u, v, w, x;
                r.Style = (obj) => {
                    var obj;
                    if (typeof obj !== 'undefined') {
                        for (t in obj) {
                            r.style[t] = obj[t];
                        }
                    }
                }
                r.On = (event, fun) => {
                    var event, fun;
                    if (typeof event !== 'undefined' && typeof fun !== 'undefined') {
                        r.addEventListener(event, fun);
                    }
                }
                r.Text = (val) => {
                    var val;
                    if (typeof val !== 'undefined' && val !== '') {
                        r.innerText = val;
                        return val;
                    } else {
                        return r.innerText;
                    }
                }
                if (typeof returnElement !== 'undefined') {
                    if (typeof g.Selector !== 'undefined') {
                        g.Selector(returnElement).appendChild(r);
                    } else {
                        console.error("Couldn't create element!");
                    }
                }
                return r;
            }
            function wj(r) {
                var r, t, u, v, w, x;
                return r;
            }
        },
        JSON: function (filepath, callback) {
            var filepath, callback, a, b, c, d, e, f;
            b = filepath.split(".");
            if (b[b.length - 1] == 'json') {
                a = new XMLHttpRequest();
                a.addEventListener("readystatechange", function () {
                    if (this.readyState == 4) {
                        if (this.status == 200 || this.status == 0) {
                            d = this.responseText;
                            if (typeof callback !== 'undefined') {
                                callback(response = {
                                    parse: JSON.parse(this.responseText),
                                    string: JSON.stringify(this.responseText)
                                });
                            }
                        } else {
                            console.error("Failed to load " + filepath);
                            console.error("Request responded with status: " + this.status);
                        }
                    }
                });
                a.open("GET", filepath, true);
                a.send(null);
            }
        },
        ScrollListener: function (target, type, callback) {
            var target, a, b, c, d, e, callback, type;
            if (typeof target !== 'undefined') {
                if (typeof target == 'object') {
                    if (target !== null) {
                        if (typeof type !== 'undefined') {
                            if (type == 'direction') {
                                var a = window.pageYOffset;
                                target.addEventListener("scroll", function (event) {
                                    var b = window.pageYOffset;
                                    if (a > b) {
                                        if (typeof callback == 'function') {
                                            callback(dir = {
                                                top: true,
                                                bottom: false
                                            });
                                        }
                                    } else {
                                        if (typeof callback == 'function') {
                                            callback(dir = {
                                                top: false,
                                                bottom: true
                                            });
                                        }
                                    }
                                    a = b;
                                });
                            }
                            if (type.substring(0, 7) == 'trigger') {
                                a = type.substring(8);
                                b = parseFloat(a) || parseInt(a);
                                if (typeof b !== 'undefined' && b !== NaN) {
                                    target.addEventListener("scroll", function (event) {
                                        c = target.scrollTop || target.pageYOffset;
                                        if (c > b) {
                                            if (typeof callback == 'function') {
                                                callback(triggered = true)
                                            }
                                        }
                                        if (c < b) {
                                            if (typeof callback == 'function') {
                                                callback(triggered = false);
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    }
                } else {
                    console.error("The first argument has to be a object!");
                }
            }
        },
        Prompt: function (text, callback) {
            var a, b, c, d, e, f, text, h, i, j, k, l, m, n, o, url, newurl, lang, ems, callback;
            function setUniqueID(l) {
                var a, b, c, d, e, f;
                a = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                b = "";
                for (var i = 0; i < l; i++) {
                    c = Math.floor(Math.random() * a.length);
                    d = a.charAt(c);
                    b += d;
                }
                return b;
            }
            ems = [];
            lang = navigator.language;
            // lang = document.getElementsByTagName("html")[0].getAttribute("lang"); if (lang == null) { lang = 'en' };
            if (dx_lang[lang] == undefined) { lang = 'en' };
            url = location.href.split('/');
            if (url[0] == 'http:' || url[0] == 'https:') { newurl = url[2]; } else { newurl = location.href; }
            var overlay = document.createElement("div");
            overlay.className = 'g-overlay';
            overlay.setAttribute("unique-id", setUniqueID(24));
            overlay.setAttribute("g-role", "overlay");
            document.body.appendChild(overlay);
            b = document.createElement("div");
            b.addEventListener("contextmenu", function (event) {
                event.preventDefault();
            });
            b.setAttribute("unique-id", setUniqueID(12));
            b.className = 'g-dialog';
            c = document.createElement("div");
            c.className = 'g-dialog-container';
            d = document.createElement("div");
            d.className = 'g-dialog-container-title';
            d.innerHTML = `<span>${newurl} ${dx_lang[lang].title}</span>`;
            c.appendChild(d);
            b.appendChild(c);
            overlay.appendChild(b);
            e = document.createElement("div");
            e.className = 'g-dialog-container-input-container';
            c.appendChild(e);
            if (typeof text !== 'undefined') {
                if (typeof text == 'string') {
                    f = document.createElement("div");
                    f.className = 'g-dialog-container-input-container-target';
                    f.setAttribute("contenteditable", true);
                    f.setAttribute("spellcheck", false);
                    f.setAttribute("data-content", text);
                    f.addEventListener("keypress", function (event) {
                        if (event.keyCode == 13) {
                            event.preventDefault();
                            be();
                        }
                    });
                    e.appendChild(f);
                    ems.push(f);
                }
                if (typeof text == 'object') {
                    for (var i = 0; i < text.length; i++) {
                        f = document.createElement("div");
                        f.className = 'g-dialog-container-input-container-target';
                        f.setAttribute("contenteditable", true);
                        f.setAttribute("spellcheck", false);
                        f.setAttribute("data-content", text[i]);
                        f.setAttribute("unique-id", setUniqueID(18));
                        f.addEventListener("keypress", function (event) {
                            if (event.keyCode == 13) {
                                event.preventDefault();
                            }
                        });
                        e.appendChild(f);
                        ems.push(f);
                    }
                }
            }
            h = document.createElement("div");
            h.className = 'g-dialog-container-buttoncontainer';
            c.appendChild(h);
            var button_cancel = document.createElement("div");
            button_cancel.className = 'g-dialog-container-buttoncontainer-button button-cancel';
            button_cancel.innerHTML = `<span>${dx_lang[lang].cancel}</span>`;
            button_cancel.onclick = function () {
                b.classList.add("g-dialog-hidden");
                setTimeout(function () {
                    b.remove();
                    overlay.remove();
                     this;
                }, 400);
            }
            window.addEventListener("keydown", function (event) {
                if (event.keyCode == 27) {
                    b.classList.add("g-dialog-hidden");
                    setTimeout(function () {
                        b.remove();
                        overlay.remove();
                          this;
                        window.removeEventListener("keydown", KeyboardEvent);
                    }, 400);
                }
            });
            h.appendChild(button_cancel);
            var button_accept = document.createElement("div");
            button_accept.className = 'g-dialog-container-buttoncontainer-button button-accept';
            button_accept.innerHTML = `<span>${dx_lang[lang].accept}</span>`;
            button_accept.onclick = be;
            h.appendChild(button_accept);
            function be() {
                var ew = [];
                if (ems.length > 1) {
                    for (var i = 0; i < ems.length; i++) {
                        ew.push(ems[i].innerText);
                    }
                }
                if (ems.length == 1) {
                    ew = ems[0].innerText;
                }
                if (typeof callback !== 'undefined') {
                    if (typeof callback == 'function') {
                        callback(result = ew);
                    }
                }
                b.classList.add("g-dialog-hidden");
                setTimeout(function () {
                    b.remove();
                    overlay.remove();
                     this;
                }, 400);
            }
        },
        Alert(text) {
            var a, b, c, d, e, f, text, ems, h;
            function setUniqueID(l) {
                var a, b, c, d, e, f;
                a = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                b = "";
                for (var i = 0; i < l; i++) {
                    c = Math.floor(Math.random() * a.length);
                    d = a.charAt(c);
                    b += d;
                }
                return b;
            }
            lang = navigator.language;
            if (dx_lang[lang] == undefined) { lang = 'en' };
            url = location.href.split('/');
            if (url[0] == 'http:' || url[0] == 'https:') { newurl = url[2]; } else { newurl = location.href; }
            a = document.createElement("div"); a.className = 'g-overlay'; document.body.appendChild(a); a.setAttribute("unique-id", setUniqueID(12));
            b = document.createElement("div"); b.className = 'g-dialog'; b.setAttribute('role', 'alert'); b.setAttribute("unique-id", setUniqueID(22)); a.appendChild(b);
            b.addEventListener("contextmenu", function (event) {
                event.preventDefault();
            });
            c = document.createElement("div"); c.className = 'g-dialog-container'; b.appendChild(c);
            d = document.createElement("div"); d.className = 'g-dialog-container-title';
            d.innerHTML = `<span>${newurl} ${dx_lang[lang].alert_title}</span>`;
            c.appendChild(d);
            e = document.createElement("div");
            e.className = 'g-dialog-container-content';
            e.innerHTML = `<span>${text}</span>`;
            c.appendChild(e);
            f = document.createElement("div"); f.className = 'g-dialog-container-buttoncontainer'; c.appendChild(f);
            h = document.createElement("div"); h.className = 'g-dialog-container-buttoncontainer-button button-accept';
            h.innerHTML = `<span>${dx_lang[lang].accept}</span>`;
            h.onclick = be;
            f.appendChild(h);

            function be() {
                b.classList.add("g-dialog-hidden");
                setTimeout(function () {
                    b.remove();
                    a.remove();
                     this;
                }, 400);
            }
        },
        Notification: function (obj) {
            var a, b, c, d, e, f, obj, mainobj, h, i, j, k, l, newurl;
            for (var k = 0; k < notification_elements.length; k++) {
                notification_elements[k].style.bottom = (parseFloat(getComputedStyle(notification_elements[k]).bottom) + parseFloat(getComputedStyle(notification_elements[k]).height)) + (parseFloat(getComputedStyle(notification_elements[k]).padding) + 30) + "px";;
            }
            mainobj = {
                Title: undefined,
                Text: undefined,
                Button: {
                    Accept: undefined,
                    Cancel: undefined
                },
                Duration: 3000
            }
            for (et in obj) {
                mainobj[et] = obj[et];
            }
            if (mainobj.Title == '$title') {
                mainobj.Title = document.title;
            }
            var url = location.href.split('/');
            if (url[0] == 'http:' || url[0] == 'https:') { newurl = url[2]; } else { newurl = location.href; }
            lang = navigator.language;
            if (dx_lang[lang] == undefined) { lang = 'en' };
            url = location.href.split('/');
            b = document.createElement("div"); b.className = 'g-notification'; document.body.appendChild(b); notification_elements.push(b);
            c = document.createElement("div"); c.className = 'g-notification-container'; b.appendChild(c);
            d = document.createElement("div"); d.className = 'g-notification-container-title';
            if (mainobj.Title !== undefined) { d.innerHTML = `<span>${mainobj.Title} ${dx_lang[lang].alert_title}</span>`; } if (mainobj.Title == undefined) d.innerHTML = `<span>${newurl} ${dx_lang[lang].alert_title}</span>`;
            c.appendChild(d);
            e = document.createElement("div"); e.className = 'g-notification-container-hl'; c.appendChild(e);
            f = document.createElement("div"); f.className = 'g-notification-container-content'; f.innerHTML = `<span>${mainobj.Text}</span>`; c.appendChild(f);
            h = document.createElement("div"); h.className = 'g-notification-container-buttoncontainer'; c.appendChild(h);
            if (mainobj.Button.Cancel !== undefined) {
                i = document.createElement("div"); i.className = 'g-notification-container-buttoncontainer-button button-cancel'; i.innerHTML = `<span>${dx_lang[lang].cancel}</span>`; h.appendChild(i);
                i.onclick = function () {
                    if (typeof mainobj.Button.Cancel == 'function') {
                        mainobj.Button.Cancel();
                    }
                    aw();
                };
            }
            if (mainobj.Button.Accept !== undefined) {
                j = document.createElement("div"); j.className = 'g-notification-container-buttoncontainer-button button-accept'; j.innerHTML = `<span>${dx_lang[lang].accept}</span>`; h.appendChild(j);
                j.onclick = function () {
                    if (typeof mainobj.Button.Accept == 'function') {
                        mainobj.Button.Accept();
                    }
                    aw();
                };
            }
            setTimeout(function () {
                if (b.className.indexOf("g-notification-hide") < 0) {
                    aw();
                }
            }, mainobj.Duration);

            function aw() {
                b.classList.add("g-notification-hide");
                setTimeout(function () {
                    b.remove();
                }, 300);
            }
        },
        GetStyle: function (element, property) {
            if (typeof element !== 'undefined') {
                if (element instanceof HTMLElement) {
                    if (typeof property !== 'undefined') {
                        return getComputedStyle(element)[property];
                    } else {
                        return getComputedStyle(element);
                    }
                }
            }
        },
        ColorPicker: function (callback) {
            var a, b, c, d, e, f, callback;
        }
    };
    a.Colors = {
        RED: "#ff0000",
        ORANGE: "#ff6600",
        YELLOW: "#ffff00",
        GREEN: "#008000",
        BLUE: "#0000ff",
        INDIGO: "#4b0082",
        VIOLET: "#7f00ff",
        BLACK: "#000000",
        WHITE: "#ffffff",
        RANDOM: function () {
            var r, g, b;
            r = Math.floor(Math.random() * 255);
            g = Math.floor(Math.random() * 255);
            b = Math.floor(Math.random() * 255);
            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
    }
    a.$g = function (a, b) {
        var a, b;
    }
    g.Canvas2DGameModule = class Canvas2DGameModule {
        constructor() {
            
        }
        Setup(obj) {
            var a, b, c, d, e, f;
            a = {
                CanvasID: undefined,
                CanvasClassName: undefined,
                ParentElement: undefined,
                Style: {},
                Attributes: []
            }
            for (b in obj) a[b] = obj[b];
            c = document.createElement("div");
            if (typeof a.CanvasID !== 'undefined') {
                c.setAttribute("id", a.CanvasID);
            }
            if (typeof a.CanvasClassName !== 'undefined') {
                c.setAttribute("class", a.CanvasClassName);
            }
        }
        Draw() {
                        
        }
        Movement() {

        }
        Graphics() {

        }
        Update() {

        }
    }

    g.Canvas = class Canvas{
        constructor() {
            this.width = undefined;
            this.height = undefined;
            this.documentElement = undefined;
            this.id = undefined;
        }
        SetCanvas(elementReturn) {
            var a, b, c, d, e, f, elementReturn;
            if (this.height == 'full') this.height = window.innerHeight;
            if (this.width == 'full') this.width = window.innerWidth;
            a = document.createElement("canvas");
            a.width = this.width;
            a.height = this.height;
            if (typeof this.id !== "undefined") {
                a.setAttribute("name", this.id);
            } else {
                b = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                d = navigator.userAgent.split(" ");
                c = "";
                for (var i = 0; i < 22; i++) {
                    c += b.charAt(Math.floor(Math.random() * b.length));
                }
                this.id = c;
                a.setAttribute("unique-id", c);
            }
            this.documentElement = a;
            g.Selector(elementReturn).appendChild(a);
            a = null;
            this.ctx = this.documentElement.getContext("2d");
        }
        DrawLine(obj) {
            var obj, a, b, c, d, e;
            if (typeof obj == "object") {
                a = {
                    NewPath: true,
                    StartX: undefined,
                    StartY: undefined,
                    EndX: undefined,
                    EndY: undefined,
                    LineColor: 'black',
                    LineWidth: 1,
                    LineCap: undefined
                }
                for (b in obj) a[b] = obj[b];
                if (a.NewPath == true) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = a.LineColor;
                    this.ctx.lineCap = a.LineCap;
                    this.ctx.lineWidth = a.LineWidth;
                    this.ctx.moveTo(a.StartX, a.StartY);
                    this.ctx.lineTo(a.EndX, a.EndY);
                    this.ctx.stroke();
                    this.ctx.closePath();
                }
                return c = {
                    On: (event, func) => {
                        var event, func, a, b, c, d, e;

                    }
                } 
            } else {
                console.error("You need to enter a object as argument");
            }
        }
    }
})(window);