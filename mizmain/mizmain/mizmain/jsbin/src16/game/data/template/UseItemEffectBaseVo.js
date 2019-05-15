var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var UseItemEffectBaseVo = /** @class */ (function () {
                function UseItemEffectBaseVo() {
                }
                UseItemEffectBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.destWindow = data.getUTFBytes(data.getUint32());
                };
                return UseItemEffectBaseVo;
            }());
            template.UseItemEffectBaseVo = UseItemEffectBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=UseItemEffectBaseVo.js.map