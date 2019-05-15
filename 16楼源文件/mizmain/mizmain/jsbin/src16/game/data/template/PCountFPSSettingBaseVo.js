var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PCountFPSSettingBaseVo = /** @class */ (function () {
                function PCountFPSSettingBaseVo() {
                }
                PCountFPSSettingBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.minfps = data.getUint32();
                    this.maxfps = data.getUint32();
                    this.playercount = data.getUint32();
                };
                return PCountFPSSettingBaseVo;
            }());
            template.PCountFPSSettingBaseVo = PCountFPSSettingBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PCountFPSSettingBaseVo.js.map