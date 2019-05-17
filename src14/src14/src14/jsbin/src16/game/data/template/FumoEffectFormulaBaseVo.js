/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var FumoEffectFormulaBaseVo = /** @class */ (function () {
                function FumoEffectFormulaBaseVo() {
                }
                FumoEffectFormulaBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.strname = data.getUTFBytes(data.getUint32());
                    this.npropertyid = data.getUint32();
                    this.fmin = data.getFloat64();
                    this.fmax = data.getFloat64();
                    this.npropertyid2 = data.getUint32();
                    this.fmin2 = data.getFloat64();
                    this.fmax2 = data.getFloat64();
                };
                return FumoEffectFormulaBaseVo;
            }());
            template.FumoEffectFormulaBaseVo = FumoEffectFormulaBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=FumoEffectFormulaBaseVo.js.map