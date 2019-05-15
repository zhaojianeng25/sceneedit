var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var GameconfigBaseVo = /** @class */ (function () {
                function GameconfigBaseVo() {
                }
                GameconfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.key = data.getUTFBytes(data.getUint32());
                    this.wndname = data.getUTFBytes(data.getUint32());
                    this.leixingtype = data.getUint32();
                    this.value = data.getUint32();
                };
                return GameconfigBaseVo;
            }());
            template.GameconfigBaseVo = GameconfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=GameconfigBaseVo.js.map