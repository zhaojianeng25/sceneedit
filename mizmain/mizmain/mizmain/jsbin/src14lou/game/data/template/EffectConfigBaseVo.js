var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var EffectConfigBaseVo = /** @class */ (function () {
                function EffectConfigBaseVo() {
                }
                EffectConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.classname = data.getUTFBytes(data.getUint32());
                    this.xianshi = data.getUint32();
                    this.color = data.getUint32();
                    this.order = data.getUint32();
                    this.effectid = data.getUint32();
                    this.reducecolor = data.getUint32();
                    this.reduceeffectid = data.getUint32();
                    this.width = data.getUint32();
                    this.ablLimit = data.getFloat64();
                    this.pctLimit = data.getFloat64();
                };
                return EffectConfigBaseVo;
            }());
            template.EffectConfigBaseVo = EffectConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=EffectConfigBaseVo.js.map