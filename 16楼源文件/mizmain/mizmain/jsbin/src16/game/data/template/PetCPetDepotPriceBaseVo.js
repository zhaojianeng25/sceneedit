/**
* name c宠物仓库扩充价格
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PetCPetDepotPriceBaseVo = /** @class */ (function () {
                function PetCPetDepotPriceBaseVo() {
                }
                PetCPetDepotPriceBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.num = data.getUint32();
                    this.nextneedmoney = data.getUint32();
                };
                return PetCPetDepotPriceBaseVo;
            }());
            template.PetCPetDepotPriceBaseVo = PetCPetDepotPriceBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PetCPetDepotPriceBaseVo.js.map