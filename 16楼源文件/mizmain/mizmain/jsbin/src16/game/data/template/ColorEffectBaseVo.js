var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ColorEffectBaseVo = /** @class */ (function () {
                function ColorEffectBaseVo() {
                }
                ColorEffectBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.red = data.getUint32();
                    this.yellow = data.getUint32();
                    this.blue = data.getUint32();
                    this.orgreender = data.getUint32();
                };
                return ColorEffectBaseVo;
            }());
            template.ColorEffectBaseVo = ColorEffectBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ColorEffectBaseVo.js.map