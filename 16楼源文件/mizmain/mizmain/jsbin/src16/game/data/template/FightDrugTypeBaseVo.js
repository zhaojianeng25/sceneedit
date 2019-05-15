/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var FightDrugTypeBaseVo = /** @class */ (function () {
                function FightDrugTypeBaseVo() {
                }
                FightDrugTypeBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.typeid = data.getUint32();
                };
                return FightDrugTypeBaseVo;
            }());
            template.FightDrugTypeBaseVo = FightDrugTypeBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=FightDrugTypeBaseVo.js.map