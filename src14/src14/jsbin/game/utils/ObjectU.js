/**对象工具
* name 王谦
*/
var game;
(function (game) {
    var utils;
    (function (utils) {
        var ObjectU = /** @class */ (function () {
            function ObjectU() {
            }
            /**为UI创建存储对象*/
            ObjectU.createObjectUI = function (view, index, args) {
                if (!args || !args.length) {
                    logd("this args is empty");
                    return null;
                }
                var obj = {};
                for (var i = 0; i < args.length; i++) {
                    obj[args[i]] = view[args[i] + index];
                }
                return obj;
            };
            /**复制合并对象*/
            ObjectU.cloneObject = function (base, clone) {
                if (clone === void 0) { clone = null; }
                if (!base) {
                    logd("this base is null");
                    return clone;
                }
                if (!clone)
                    clone = {};
                var key;
                for (key in base) {
                    clone[key] = base[key];
                }
                return clone;
            };
            /**复制合并对象*/
            ObjectU.cloneObjectList = function (bases, clones) {
                if (clones === void 0) { clones = null; }
                if (!bases) {
                    logd("this bases is null");
                    return null;
                }
                if (!clones)
                    clones = [];
                if (clones.length < bases.length)
                    clones.length = bases.length;
                for (var i = 0; i < bases.length; i++) {
                    if (!bases[i])
                        continue;
                    clones[i] = ObjectU.cloneObject(bases[i], clones[i]);
                }
                return clones;
            };
            return ObjectU;
        }());
        utils.ObjectU = ObjectU;
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
//# sourceMappingURL=ObjectU.js.map