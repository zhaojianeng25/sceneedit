/**
* name g公会药房数据表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ClanCFactionDrugStoreBaseVo = /** @class */ (function () {
                function ClanCFactionDrugStoreBaseVo() {
                }
                ClanCFactionDrugStoreBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.levelupcost = data.getUint32();
                    this.dragnummax = data.getUint32();
                    this.doublemoney = data.getUint32();
                    this.trimoney = data.getUint32();
                    this.costeveryday = data.getUint32();
                };
                return ClanCFactionDrugStoreBaseVo;
            }());
            template.ClanCFactionDrugStoreBaseVo = ClanCFactionDrugStoreBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ClanCFactionDrugStoreBaseVo.js.map