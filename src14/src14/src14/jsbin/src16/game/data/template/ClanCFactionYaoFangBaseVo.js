/**
* name y药品购买配置
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ClanCFactionYaoFangBaseVo = /** @class */ (function () {
                function ClanCFactionYaoFangBaseVo() {
                }
                ClanCFactionYaoFangBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.money = data.getUint32();
                    this.banggong = data.getUint32();
                    this.Factionrandom = data.getUint32();
                };
                return ClanCFactionYaoFangBaseVo;
            }());
            template.ClanCFactionYaoFangBaseVo = ClanCFactionYaoFangBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ClanCFactionYaoFangBaseVo.js.map