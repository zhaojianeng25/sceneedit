/**
* MD5
*/
var game;
(function (game) {
    var utils;
    (function (utils) {
        /**
        * The MD5 Message-Digest Algorithm
        */
        var MD5 = /** @class */ (function () {
            function MD5() {
            }
            /**
             * Performs the MD5 hash algorithm on a string.
             *
             * @param s The string to hash
             * @return A string containing the hash value of s
             * @tiptext
             */
            MD5.hash = function (s) {
                //Convert to byteArray and send through hashBinary function
                // so as to only have complex code in one location
                var ba = new ByteArray();
                ba.writeUTFBytes(s);
                return this.hashBinary(ba);
            };
            MD5.hashBytes = function (s) {
                return this.hashBinary(s);
            };
            /**
             * Performs the MD5 hash algorithm on a ByteArray.
             *
             * @param s The string to hash
             * @return A string containing the hash value of s
             * @tiptext
             */
            MD5.hashBinary = function (s) {
                // initialize the md buffers
                var a = 1732584193;
                var b = -271733879;
                var c = -1732584194;
                var d = 271733878;
                // variables to store previous values
                var aa;
                var bb;
                var cc;
                var dd;
                // create the blocks from the string and
                // save the length as a local var to reduce
                // lookup in the loop below
                var x = this.createBlocks(s);
                var len = x.length;
                // loop over all of the blocks
                for (var i = 0; i < len; i += 16) {
                    // save previous values
                    aa = a;
                    bb = b;
                    cc = c;
                    dd = d;
                    // Round 1
                    a = this.ff(a, b, c, d, x[i + 0], 7, -680876936); // 1
                    d = this.ff(d, a, b, c, x[i + 1], 12, -389564586); // 2
                    c = this.ff(c, d, a, b, x[i + 2], 17, 606105819); // 3
                    b = this.ff(b, c, d, a, x[i + 3], 22, -1044525330); // 4
                    a = this.ff(a, b, c, d, x[i + 4], 7, -176418897); // 5
                    d = this.ff(d, a, b, c, x[i + 5], 12, 1200080426); // 6
                    c = this.ff(c, d, a, b, x[i + 6], 17, -1473231341); // 7
                    b = this.ff(b, c, d, a, x[i + 7], 22, -45705983); // 8
                    a = this.ff(a, b, c, d, x[i + 8], 7, 1770035416); // 9
                    d = this.ff(d, a, b, c, x[i + 9], 12, -1958414417); // 10
                    c = this.ff(c, d, a, b, x[i + 10], 17, -42063); // 11
                    b = this.ff(b, c, d, a, x[i + 11], 22, -1990404162); // 12
                    a = this.ff(a, b, c, d, x[i + 12], 7, 1804603682); // 13
                    d = this.ff(d, a, b, c, x[i + 13], 12, -40341101); // 14
                    c = this.ff(c, d, a, b, x[i + 14], 17, -1502002290); // 15
                    b = this.ff(b, c, d, a, x[i + 15], 22, 1236535329); // 16
                    // Round 2
                    a = this.gg(a, b, c, d, x[i + 1], 5, -165796510); // 17
                    d = this.gg(d, a, b, c, x[i + 6], 9, -1069501632); // 18
                    c = this.gg(c, d, a, b, x[i + 11], 14, 643717713); // 19
                    b = this.gg(b, c, d, a, x[i + 0], 20, -373897302); // 20
                    a = this.gg(a, b, c, d, x[i + 5], 5, -701558691); // 21
                    d = this.gg(d, a, b, c, x[i + 10], 9, 38016083); // 22
                    c = this.gg(c, d, a, b, x[i + 15], 14, -660478335); // 23
                    b = this.gg(b, c, d, a, x[i + 4], 20, -405537848); // 24
                    a = this.gg(a, b, c, d, x[i + 9], 5, 568446438); // 25
                    d = this.gg(d, a, b, c, x[i + 14], 9, -1019803690); // 26
                    c = this.gg(c, d, a, b, x[i + 3], 14, -187363961); // 27
                    b = this.gg(b, c, d, a, x[i + 8], 20, 1163531501); // 28
                    a = this.gg(a, b, c, d, x[i + 13], 5, -1444681467); // 29
                    d = this.gg(d, a, b, c, x[i + 2], 9, -51403784); // 30
                    c = this.gg(c, d, a, b, x[i + 7], 14, 1735328473); // 31
                    b = this.gg(b, c, d, a, x[i + 12], 20, -1926607734); // 32
                    // Round 3
                    a = this.hh(a, b, c, d, x[i + 5], 4, -378558); // 33
                    d = this.hh(d, a, b, c, x[i + 8], 11, -2022574463); // 34
                    c = this.hh(c, d, a, b, x[i + 11], 16, 1839030562); // 35
                    b = this.hh(b, c, d, a, x[i + 14], 23, -35309556); // 36
                    a = this.hh(a, b, c, d, x[i + 1], 4, -1530992060); // 37
                    d = this.hh(d, a, b, c, x[i + 4], 11, 1272893353); // 38
                    c = this.hh(c, d, a, b, x[i + 7], 16, -155497632); // 39
                    b = this.hh(b, c, d, a, x[i + 10], 23, -1094730640); // 40
                    a = this.hh(a, b, c, d, x[i + 13], 4, 681279174); // 41
                    d = this.hh(d, a, b, c, x[i + 0], 11, -358537222); // 42
                    c = this.hh(c, d, a, b, x[i + 3], 16, -722521979); // 43
                    b = this.hh(b, c, d, a, x[i + 6], 23, 76029189); // 44
                    a = this.hh(a, b, c, d, x[i + 9], 4, -640364487); // 45
                    d = this.hh(d, a, b, c, x[i + 12], 11, -421815835); // 46
                    c = this.hh(c, d, a, b, x[i + 15], 16, 530742520); // 47
                    b = this.hh(b, c, d, a, x[i + 2], 23, -995338651); // 48
                    // Round 4
                    a = this.ii(a, b, c, d, x[i + 0], 6, -198630844); // 49
                    d = this.ii(d, a, b, c, x[i + 7], 10, 1126891415); // 50
                    c = this.ii(c, d, a, b, x[i + 14], 15, -1416354905); // 51
                    b = this.ii(b, c, d, a, x[i + 5], 21, -57434055); // 52
                    a = this.ii(a, b, c, d, x[i + 12], 6, 1700485571); // 53
                    d = this.ii(d, a, b, c, x[i + 3], 10, -1894986606); // 54
                    c = this.ii(c, d, a, b, x[i + 10], 15, -1051523); // 55
                    b = this.ii(b, c, d, a, x[i + 1], 21, -2054922799); // 56
                    a = this.ii(a, b, c, d, x[i + 8], 6, 1873313359); // 57
                    d = this.ii(d, a, b, c, x[i + 15], 10, -30611744); // 58
                    c = this.ii(c, d, a, b, x[i + 6], 15, -1560198380); // 59
                    b = this.ii(b, c, d, a, x[i + 13], 21, 1309151649); // 60
                    a = this.ii(a, b, c, d, x[i + 4], 6, -145523070); // 61
                    d = this.ii(d, a, b, c, x[i + 11], 10, -1120210379); // 62
                    c = this.ii(c, d, a, b, x[i + 2], 15, 718787259); // 63
                    b = this.ii(b, c, d, a, x[i + 9], 21, -343485551); // 64
                    a += aa;
                    b += bb;
                    c += cc;
                    d += dd;
                }
                var digest = new ByteArray();
                this.digest = digest;
                digest.writeInt(a);
                digest.writeInt(b);
                digest.writeInt(c);
                digest.writeInt(d);
                digest.position = 0;
                // Finish up by concatening the buffers with their hex output
                return IntUtil.toHex(a) + IntUtil.toHex(b) + IntUtil.toHex(c) + IntUtil.toHex(d);
            };
            /**
             * Auxiliary function f as defined in RFC
             */
            MD5.f = function (x, y, z) {
                return (x & y) | ((~x) & z);
            };
            /**
             * Auxiliary function g as defined in RFC
             */
            MD5.g = function (x, y, z) {
                return (x & z) | (y & (~z));
            };
            /**
             * Auxiliary function h as defined in RFC
             */
            MD5.h = function (x, y, z) {
                return x ^ y ^ z;
            };
            /**
             * Auxiliary function i as defined in RFC
             */
            MD5.i = function (x, y, z) {
                return y ^ (x | (~z));
            };
            /**
             * A generic transformation function.  The logic of ff, gg, hh, and
             * ii are all the same, minus the function used, so pull that logic
             * out and simplify the method bodies for the transoformation functions.
             */
            MD5.transform = function (func, a, b, c, d, x, s, t) {
                var v = Number(func(b, c, d));
                var tmp = utils.MathU.toInt(a + v + x + t);
                return IntUtil.rol(tmp, s) + b;
            };
            /**
             * ff transformation function
             */
            MD5.ff = function (a, b, c, d, x, s, t) {
                return this.transform(this.f, a, b, c, d, x || 0, s, t);
            };
            /**
             * gg transformation function
             */
            MD5.gg = function (a, b, c, d, x, s, t) {
                return this.transform(this.g, a, b, c, d, x || 0, s, t);
            };
            /**
             * hh transformation function
             */
            MD5.hh = function (a, b, c, d, x, s, t) {
                return this.transform(this.h, a, b, c, d, x || 0, s, t);
            };
            /**
             * ii transformation function
             */
            MD5.ii = function (a, b, c, d, x, s, t) {
                return this.transform(this.i, a, b, c, d, x || 0, s, t);
            };
            /**
             * Converts a string to a sequence of 16-word blocks
             * that we'll do the processing on.  Appends padding
             * and length in the process.
             *
             * @param s The string to split into blocks
             * @return An array containing the blocks that s was
             *			split into.
             */
            MD5.createBlocks = function (s) {
                var blocks = new Array();
                var len = s.length;
                s.position = 0;
                var mask = 0xFF; // ignore hi byte of characters > 0xFF
                for (var i = 0; i < len; i++) {
                    var idx = i * 8;
                    var v = (s.readByte() & mask) << (idx % 32);
                    blocks[Number(idx >> 5)] |= v;
                }
                len = len * 8;
                // append padding and length
                blocks[Number(len >> 5)] |= 0x80 << (len % 32);
                blocks[Number((((len + 64) >>> 9) << 4) + 14)] = len;
                return blocks;
            };
            return MD5;
        }());
        utils.MD5 = MD5;
        var IntUtil = /** @class */ (function () {
            function IntUtil() {
            }
            /**
             * Rotates x left n bits
             *
             * @langversion ActionScript 3.0
             * @playerversion Flash 9.0
             * @tiptext
             */
            IntUtil.rol = function (x, n) {
                return (x << n) | (x >>> (32 - n));
            };
            /**
             * Rotates x right n bits
             *
             * @langversion ActionScript 3.0
             * @playerversion Flash 9.0
             * @tiptext
             */
            IntUtil.ror = function (x, n) {
                var nn = 32 - n;
                return (x << nn) | (x >>> (32 - nn));
            };
            /**
             * Outputs the hex value of a int, allowing the developer to specify
             * the endinaness in the process.  Hex output is lowercase.
             *
             * @param n The int value to output as hex
             * @param bigEndian Flag to output the int as big or little endian
             * @return A string of length 8 corresponding to the
             *		hex representation of n ( minus the leading "0x" )
             * @langversion ActionScript 3.0
             * @playerversion Flash 9.0
             * @tiptext
             */
            IntUtil.toHex = function (n, bigEndian) {
                if (bigEndian === void 0) { bigEndian = false; }
                var s = "";
                if (bigEndian) {
                    for (var i = 0; i < 4; i++) {
                        s += this.hexChars.charAt((n >> ((3 - i) * 8 + 4)) & 0xF)
                            + this.hexChars.charAt((n >> ((3 - i) * 8)) & 0xF);
                    }
                }
                else {
                    for (var x = 0; x < 4; x++) {
                        s += this.hexChars.charAt((n >> (x * 8 + 4)) & 0xF)
                            + this.hexChars.charAt((n >> (x * 8)) & 0xF);
                    }
                }
                return s;
            };
            /** String for quick lookup of a hex character based on index */
            IntUtil.hexChars = "0123456789abcdef";
            return IntUtil;
        }());
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
//# sourceMappingURL=MD5.js.map