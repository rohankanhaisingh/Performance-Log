/*
 *  Fireview.js © by Rohan Kanhaisingh.
 * 
 *  UniqueID
 *  
 *  uniqueID.js
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

export { setUniqueID };