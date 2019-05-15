/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var BattleBackGroundBaseVo = /** @class */ (function () {
                function BattleBackGroundBaseVo() {
                }
                BattleBackGroundBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.path = data.getUTFBytes(data.getUint32());
                };
                return BattleBackGroundBaseVo;
            }());
            template.BattleBackGroundBaseVo = BattleBackGroundBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=BattleBackGroundBaseVo.js.map