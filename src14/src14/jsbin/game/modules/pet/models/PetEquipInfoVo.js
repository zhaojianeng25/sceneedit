/**
* 宠物装备信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet) {
            var models;
            (function (models) {
                var PetEquipInfoVo = /** @class */ (function () {
                    function PetEquipInfoVo() {
                        this.petequipinfo = new Laya.Dictionary();
                    }
                    return PetEquipInfoVo;
                }());
                models.PetEquipInfoVo = PetEquipInfoVo;
            })(models = pet.models || (pet.models = {}));
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetEquipInfoVo.js.map