var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var MarryConfBaseVo = /** @class */ (function () {
                function MarryConfBaseVo() {
                }
                MarryConfBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.effectid = data.getUint32();
                    this.posx = data.getUint32();
                    this.posy = data.getUint32();
                    this.actionid = data.getUint32();
                    this.actiontime = data.getUint32();
                };
                return MarryConfBaseVo;
            }());
            template.MarryConfBaseVo = MarryConfBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=MarryConfBaseVo.js.map