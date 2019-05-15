/**
* 随机类
*/
var game;
(function (game) {
    var utils;
    (function (utils) {
        var Random = /** @class */ (function () {
            function Random(seed) {
                // 随机因子
                this.seed = 0;
                this.m = Math.pow(2, 32);
                this.a = 1664525;
                this.c = 1013904223;
                this.seed = seed;
            }
            Object.defineProperty(Random, "instance", {
                get: function () {
                    if (!this._instance) {
                        this._instance = new Random(0);
                    }
                    return this._instance;
                },
                enumerable: true,
                configurable: true
            });
            // 重置随机种子
            Random.scand = function (v) {
                this.instance.scand(v);
            };
            // 随机1个整数
            Random.rand = function () {
                return this.instance.rand();
            };
            // 随机一个0-1之间的浮点数
            Random.randFloat = function () {
                return this.instance.randFloat();
            };
            // 随机给定范围[a,b]的整数
            Random.randInt = function (a, b) {
                return this.instance.randInt(a, b);
            };
            // 重置随机种子
            Random.prototype.scand = function (v) {
                this.seed = utils.MathU.parseInt(v);
            };
            // 随机1个整数
            Random.prototype.rand = function () {
                this.seed = (this.seed * this.a + this.c) % this.m;
                return this.seed;
            };
            // 随机一个0-1之间的浮点数
            Random.prototype.randFloat = function () {
                return this.rand() / (this.m + 1);
            };
            // 随机给定范围[a,b]的整数
            Random.prototype.randInt = function (a, b) {
                a = utils.MathU.parseInt(a);
                b = utils.MathU.parseInt(b);
                return Math.min(a, b) + utils.MathU.parseInt((Math.abs(a - b) + 1) * this.randFloat());
            };
            return Random;
        }());
        utils.Random = Random;
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
//# sourceMappingURL=Random.js.map