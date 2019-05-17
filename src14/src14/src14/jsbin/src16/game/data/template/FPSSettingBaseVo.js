var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var FPSSettingBaseVo = /** @class */ (function () {
                function FPSSettingBaseVo() {
                }
                FPSSettingBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.morevalue = data.getUint32();
                    this.lessvalue = data.getUint32();
                };
                return FPSSettingBaseVo;
            }());
            template.FPSSettingBaseVo = FPSSettingBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=FPSSettingBaseVo.js.map