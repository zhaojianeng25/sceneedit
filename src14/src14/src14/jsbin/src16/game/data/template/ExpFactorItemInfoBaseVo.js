/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ExpFactorItemInfoBaseVo = /** @class */ (function () {
                function ExpFactorItemInfoBaseVo() {
                }
                ExpFactorItemInfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.factor = data.getFloat64();
                    this.time = data.getUint32();
                };
                return ExpFactorItemInfoBaseVo;
            }());
            template.ExpFactorItemInfoBaseVo = ExpFactorItemInfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ExpFactorItemInfoBaseVo.js.map