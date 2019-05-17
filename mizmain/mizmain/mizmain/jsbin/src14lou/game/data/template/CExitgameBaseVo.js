var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CExitgameBaseVo = /** @class */ (function () {
                function CExitgameBaseVo() {
                }
                CExitgameBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.exp = data.getUint32();
                    this.levela = data.getUint32();
                    this.levelb = data.getUint32();
                    this.area = data.getUTFBytes(data.getUint32());
                };
                return CExitgameBaseVo;
            }());
            template.CExitgameBaseVo = CExitgameBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CExitgameBaseVo.js.map