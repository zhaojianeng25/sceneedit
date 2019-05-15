var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var TuiSongSettingBaseVo = /** @class */ (function () {
                function TuiSongSettingBaseVo() {
                }
                TuiSongSettingBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.day = data.getUTFBytes(data.getUint32());
                    this.time = data.getUTFBytes(data.getUint32());
                    this.pcount = data.getUTFBytes(data.getUint32());
                };
                return TuiSongSettingBaseVo;
            }());
            template.TuiSongSettingBaseVo = TuiSongSettingBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=TuiSongSettingBaseVo.js.map