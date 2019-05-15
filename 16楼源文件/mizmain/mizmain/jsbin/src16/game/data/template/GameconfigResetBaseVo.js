var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var GameconfigResetBaseVo = /** @class */ (function () {
                function GameconfigResetBaseVo() {
                }
                GameconfigResetBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.iosvalue = data.getUTFBytes(data.getUint32());
                    this.andvalue = data.getUint32();
                };
                return GameconfigResetBaseVo;
            }());
            template.GameconfigResetBaseVo = GameconfigResetBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=GameconfigResetBaseVo.js.map