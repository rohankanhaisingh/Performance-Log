import * as output from '../output.js';
import * as sh from '../../socketHandler.js';
import { socket } from '../../index.js';

function execute(command) {
    var a = command.split(" "), b, c, d = {maxPlayers: 10, useDiscordPresence: false, physicalMemory: 1024}, e, f, h, i, j, k, l, m, n, o, p;
    b = a[0];
    if (typeof b !== 'undefined' && b !== '' && b.length > 0) {
        switch (b) {
            case "MinecraftServer":
                c = command.substring(b.length).split(" ");
                c.forEach(function (da) {
                    if (da.substring(0, 1) == '-') {
                        switch (da.substring(1)) {
                            case "MaxPlayers":
                                for (var i = 0; i < c.length; i++) {
                                    if (c[i] == da) {
                                        d.maxPlayers = parseInt(c[i + 1]);
                                    }
                                }
                                break;
                            case "PhysicalMemory":
                                for (var i = 0; i < c.length; i++) {
                                    if (c[i] == da) {
                                        if (typeof c[i + 1] !== 'undefined') {
                                            e = c[i + 1];
                                            f = e.substring(e.length - 2);
                                            switch (f) {
                                                case "GB":
                                                    h = parseFloat(e.substring(0, e.indexOf(f)));
                                                    if (!isNaN(h)) {
                                                        d.physicalMemory = h * 1000;
                                                    } else {
                                                        output.createErrorMessage("PL", "The given string cannot be converted into a float.");
                                                    }
                                                    break;
                                                case "MB":
                                                    h = parseFloat(e.substring(0, e.indexOf(f)));
                                                    if (!isNaN(h)) {
                                                        d.physicalMemory = h;
                                                    } else {
                                                        output.createErrorMessage("PL", "The given string cannot be converted into a float.");
                                                    }
                                                    break;
                                                default:
                                                    output.createErrorMessage("PL", `${f} is not a recognized size type. Please use GB or MB`);
                                                    break;
                                            }
                                        } else {
                                            output.createErrorMessage("PL", `Missing value after argument. Enter a value after the ${da} argument to continue.`);
                                        }
                                    }
                                }
                                break;
                            case "UseDiscordPresence":
                                d.useDiscordPresence = true;
                                break;
                            case "CloseAll":
                                d.closeAll = true;
                                break;
                            default:
                                output.createErrorMessage("PL", `<code class="pl-command-arg">${da}</code> is not a recognized executable argument for this type.`);
                                break;
                        }
                    }
                });

                if (typeof d.closeAll !== 'undefined') {
                    sh.emit(socket, "execute:ms_server:close", d);
                } else {
                    sh.emit(socket, "execute:ms_server", d);
                }
                break;
            default:
                output.createErrorMessage("PL", `${b} is not a recognized executable function. Please enter <code class="pl-command">Help</code> <code class="pl-command-class">Execute</code> for more information about this command.`);
                return;
                break;
        }
    }
}

export { execute };