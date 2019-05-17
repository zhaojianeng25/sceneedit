var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var StepLoadTexSettingBaseVo = /** @class */ (function () {
                function StepLoadTexSettingBaseVo() {
                }
                StepLoadTexSettingBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.stepmovie = data.getByte();
                    this.stepalways = data.getByte();
                };
                return StepLoadTexSettingBaseVo;
            }());
            template.StepLoadTexSettingBaseVo = StepLoadTexSettingBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=StepLoadTexSettingBaseVo.js.map