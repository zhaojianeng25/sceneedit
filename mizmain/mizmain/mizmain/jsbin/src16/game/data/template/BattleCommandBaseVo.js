var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var BattleCommandBaseVo = /** @class */ (function () {
                function BattleCommandBaseVo() {
                }
                BattleCommandBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.commandstring = data.getUTFBytes(data.getUint32());
                };
                return BattleCommandBaseVo;
            }());
            template.BattleCommandBaseVo = BattleCommandBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=BattleCommandBaseVo.js.map