/*
 *  This file is available for every Performance Log webpage.
 *  
 *  Performance Log by Rohan Kanhaisingh
*/

const app = $g(".app"), bgVideo = $g("<video> in .background-02"), body = $g("<body>");
const bgContainer = $g(".background-02");
const loader = $g(".app-loader");
const loaderGridCol = $ga(".loader-grid-col");
const navbar = $g(".app-navbar");
const appTabs = $g(".tab-main");
const hash = location.href.substring(location.href.indexOf("?") + 1).split("&");

const listen = (socket) => {

    // Get the audiostream value from the server.
    socket.on("audioStreamSend", data => {

        let value = parseInt(data.d); // Convert the string into a int.

        let audioStreamMeter = $g(".audiometer-stream");

        // Check if the value is not equal to NaN.
        if (!isNaN(value)) {
            audioStreamMeter.Css("width", `${value}%`);
            audioStreamMeter.setAttribute("stream", value);
        }
    });

    socket.on("audioLevelSend", data => {
        let value = parseInt(data.d); // Convert the string into a int.

        let audioLevelMeter = $g(".audiometer-volume");

        // Check if the value is not equal to NaN.
        if (!isNaN(value)) {
            audioLevelMeter.Css("width", `${value}%`);
        }
    });
}


// Notification

const notificationContainer = $g(".container in .notification-overlay-scroller");
const notifications = [];

let scrollY = 0;

notificationContainer.On("wheel", function () {
    let direction = event.deltaY;

    if (direction > 0) {
        notifications.forEach(function (noti) {
            noti.bottom -= 40;
            noti.update();
        });
    } else {
        notifications.forEach(function (noti) {
            noti.bottom += 40;
            noti.update();
        });
    }
});

class WebNotification {
    /**
     * Creates a new inline interactive web notification.
     * @param {string} title
     * @param {string} text
     * @param {string} footer
     * @param {string} icon
     * @param {number} duration
     */
    constructor(title, subject, text, icon, duration) {
        this.title = title;
        this.text = text;
        this.subject = subject;
        this.icon = icon;
        this.duration = duration;

        this.id = Math.floor(Math.random() * 100000);

        this.onCloseEvent;
        this.onClickEvent;

        this.bottom = 100;

        this.notificationElement = $gcreat("div.notification", notificationContainer);
        this.notificationElement.style.bottom = this.bottom + "px";

        this.notificationContentLeft = $gcreat("div.notification-contentleft", this.notificationElement);
        this.notificationTitle = $gcreat("div.notification-title", this.notificationContentLeft);
        this.notificationTitle.innerHTML = `<span>${this.title}</span>`;
        this.notificationSubject = $gcreat("div.notification-subject", this.notificationContentLeft);
        this.notificationSubject.innerHTML = `<span>${this.subject}</span>`;
        this.notificationText = $gcreat("div.notification-text", this.notificationContentLeft);
        this.notificationText.innerHTML = `<span>${this.text}</span>`;

        this.notificationContentRight = $gcreat("div.notification-contentright", this.notificationElement);

        if (this.icon !== null) {
            this.notificationIcon = $gcreat("div.notification-icon", this.notificationContentRight);
            this.notificationIconImage = $gcreat("img", this.notificationIcon);
            this.notificationIconImage.src = this.icon;
        }

        this.notificationButtons = $gcreat("div.notification-buttons", this.notificationContentRight);
        this.notificationButton1 = $gcreat("div.notification-button", this.notificationButtons);
        this.notificationButton1image = $gcreat("img", this.notificationButton1);
        this.notificationButton1image.src = "../icons/icon_linkopen.jpg";
        this.notificationButton1image.style.filter = 'invert(1)';

        this.notificationButton2 = $gcreat("div.notification-button", this.notificationButtons);
        this.notificationButton2image = $gcreat("img", this.notificationButton2);
        this.notificationButton2image.src = "../icons/icon_arrowright.png";
        this.notificationButton2image.style.filter = 'invert(0)';
        this.notificationButton2.title = "Close this notification";

        this.notificationButton2.onclick = () => {
            this.notificationElement.classList.add("fadeout");
            if (typeof this.onCloseEvent == 'function') {
                this.onCloseEvent();
            }
        }

        this.notificationButton1.onclick = () => {
            this.notificationElement.classList.add("fadeout");
            if (typeof this.onClickEvent == 'function') {
                this.onClickEvent();
            }
        }

        setTimeout(() => {
            this.notificationElement.classList.add("fadeout");

            setTimeout(() => {
                this.notificationElement.remove();
                notifications.pop();
            }, 700);
        }, this.duration);

        notifications.forEach((noti) => {
            var a = this.notificationElement.getBoundingClientRect();

            noti.bottom += (a.height + 10);
            noti.update();
        });

        notifications.push(this);
    }

    update() {
        //if (this.bottom < 100) {
        //    let wei = 0;

        //    notifications.forEach(function (no) {
        //        var a = no.notificationElement.getBoundingClientRect();
        //        wei += a.height;
        //    });

        //    this.bottom =(wei + 10) + 20;
        //}

        //for (var i = 0; i < notifications.length; i++) {
        //    if (notifications[i].id !== this.id) {
        //        if (this.bottom == 100) {
                    
        //        }
        //    }
        //}

        this.notificationElement.style.bottom = this.bottom + "px";
    }

    /**
     * Event handlers for this notification.
     * @param {("close" | "click")} event Event
     * @param {Function} callback
     */
    On(event, callback) {
        switch (event) {
            case "click":
                if (typeof callback == 'function') {
                    this.onClickEvent = callback;
                }
                break;
            case "close":
                if (typeof callback == 'function') {
                    this.onCloseEvent = callback;
                }
                break;
            default:
                throw new Error(`${event} is not a supported event`);
                break;
        }
    }

    /**
     * 
     * @param {WebNotification} notification
     */
    static Get(notification) {

    }
}




// Load the settings file
const XHR = new XMLHttpRequest();

XHR.onreadystatechange = function () {
    if (this.readyState == 4) {
        if (this.status == 200) {
            var settings = JSON.parse(this.responseText);

            for (var a in settings) {
                switch (a) {
                    case "theme":
                        switch (settings[a]) {
                            case "dark":
                                app.AddClass("theme-dark");

                                bgVideo.src = "../videos/video_smoke_50fCaDVaVT3P.mp4";
                                break;
                            case "simple-bright":
                                app.AddClass("theme-simple-bright");

                                bgVideo.remove();;
                                break;
                            case "simple-dark":
                                app.AddClass("theme-simple-dark");

                                bgVideo.remove();;
                                break;
                            default:
                                app.RemoveClass("theme-dark");
                                break;
                        }
                        break;
                    case "developerMode":
                        if (settings[a]) {
                            var noti = new WebNotification("Performance Log", "Developer Mode", "Keep in mind that developermode has been disabled. Some feature may be disabled. You also may experience some bugs. To disable developermode, go to settings and disable the option. After you have done this step, restart the application.", "../icons/icon_commandline_white.png", 10000);

                            noti.On("click", function () {
                                requestPage("settings");
                            });
                        } 
                        break;
                    case "siteLoader":
                        if (!settings[a]) {
                            loader.AddClass("hidden");
                        }
                        break;
                    case "backgroundVideo":
                        if (!settings[a]) {

                            bgContainer.AddClass("bg-space");
                            bgVideo.remove();
                        }
                        break;
                }
            }
        } else {
            if (typeof $gnoti !== 'undefined') {
                if (typeof $gnoti == 'function') {
                    $gnoti({
                        Title: "Performance Log",
                        Text: "Can not find settings.json. The file may be removed by accident. Do you want to re-write the file?",
                        Button: {
                            Accept: function () {
                                var obj = {
                                    "theme": "dark",
                                    "requestInterval": 1000,
                                    "developerMode": false
                                }

                                var a = JSON.stringify(obj);
                            },
                            Cancel: true
                        },
                        Duration: 7000
                    });
                }
            }
        }
    }
}

XHR.open("GET", '../user/settings.json');
XHR.send(null);

// Toggle theme
const toggleTheme = () => {
    if (body.HasClass("essentials-themetoggle")) {
        if (app.HasClass("theme-dark")) {
            app.RemoveClass("theme-dark");

            bgVideo.src = "../videos/video_smoke_e8VnfRp1v7QL.mp4";
        } else {
            app.AddClass("theme-dark");

            bgVideo.src = "../videos/video_smoke_50fCaDVaVT3P.mp4";
        }
    }
}

// Sets a event listener on each button that has a 'button-action' attribute.
$ga("<*>").forEach(function (element) {
    if (body.HasClass("essentials-event-buttonAction")) {
        if (element.getAttribute("button-action") !== null) {
            element.addEventListener("click", function () {
                var a = this.getAttribute("button-action");
                if (a.substring(0, 11) == 'requestPage') {
                    var b = this.getAttribute("button-action").substring(12);
                    if (typeof requestPage !== 'undefined' && typeof requestPage == "function") {
                        requestPage(b);
                    }
                } else {
                    switch (a) {
                        case "toggle-darktheme":
                            toggleTheme();
                            break;
                    }
                }
            });
        }
    }
});

const collapseButton = $g(".button-navbar-collapse-toggle");

if (collapseButton !== undefined) {
    collapseButton.On("click", function () {
        const icon = this.getElementsByTagName("img")[0];
        if (navbar.HasClass("collapsed")) {
            navbar.RemoveClass("collapsed");
            appTabs.RemoveClass("expanded");
            icon.src = '../icons/icon_arrowleft.png';
        } else {
            appTabs.AddClass("expanded")
            navbar.AddClass("collapsed");
            icon.src = '../icons/icon_arrowright.png';
        }
    });
}

const addClassOnTimeout = (index, element, className, delay) => {
    setTimeout(function () {
        element.classList.add(className);
    }, index * delay);
}

for (var a in hash) {
    switch (hash[a]) {
        case "noloader":
            if (typeof loader !== 'undefined') {
                loader.AddClass("hidden");
            }
            break;

    }
}

window.addEventListener("load", function () {
    if (typeof loader !== 'undefined') {
        loader.AddClass("animate");

        for (var i = 0; i < loaderGridCol.length; i++) {
            addClassOnTimeout(i, loaderGridCol[i], 'animate', 100);
        }

        setTimeout(function () {
            loader.AddClass("hidden");

            for (var i = 0; i < loaderGridCol.length; i++) {
                loaderGridCol[i].classList.remove("animate");
            }

        }, loaderGridCol.length * 100 + 1000);
    }
});

export { listen };