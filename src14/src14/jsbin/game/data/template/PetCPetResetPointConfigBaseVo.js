/**
* name c宠物属性重置消耗
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PetCPetResetPointConfigBaseVo = /** @class */ (function () {
                function PetCPetResetPointConfigBaseVo() {
                }
                PetCPetResetPointConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.cost = data.getUint32();
                };
                return PetCPetResetPointConfigBaseVo;
            }());
            template.PetCPetResetPointConfigBaseVo = PetCPetResetPointConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PetCPetResetPointConfigBaseVo.js.map