var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var TongPingSettingBaseVo = /** @class */ (function () {
                function TongPingSettingBaseVo() {
                }
                TongPingSettingBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.morevalue = data.getUint32();
                    this.lessvalue = data.getUint32();
                };
                return TongPingSettingBaseVo;
            }());
            template.TongPingSettingBaseVo = TongPingSettingBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=TongPingSettingBaseVo.js.map