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
                            $gnoti({
                                Title: "$title",
                                Text: "Keep in mind that property 'developerMode' is set to 'true'. This may cause bugs in the application. To disable 'developerMode', go to settings.json and edit the property to false.",
                                Duration: 9000
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
function toggleTheme() {
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

$g(".button-navbar-collapse-toggle").On("click", function () {
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

function addClassOnTimeout(index, element, className, delay) {
    setTimeout(function () {
        element.classList.add(className);
    }, index * delay);
}

for (var a in hash) {
    switch (hash[a]) {
        case "noloader":
            loader.AddClass("hidden");
            break;

    }
}

window.addEventListener("load", function () {
    this.setTimeout(function () {
        loader.AddClass("animate");

        for (var i = 0; i < loaderGridCol.length; i++) {
            addClassOnTimeout(i, loaderGridCol[i], 'animate', 100);
        }

        setTimeout(function () {
            loader.AddClass("hidden");
        }, loaderGridCol.length * 100 + 1000);
    }, 2000);
});