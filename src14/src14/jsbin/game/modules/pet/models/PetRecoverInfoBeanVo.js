/**
* 宠物找回
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet) {
            var models;
            (function (models) {
                var PetRecoverInfoBeanVo = /** @class */ (function () {
                    function PetRecoverInfoBeanVo() {
                    }
                    PetRecoverInfoBeanVo.prototype.fromByteArray = function (bytes) {
                        this.petId = bytes.readInt32();
                        this.uniqId = bytes.readLong();
                        this.remainTime = bytes.readInt32();
                        this.cost = bytes.readInt32();
                    };
                    return PetRecoverInfoBeanVo;
                }());
                models.PetRecoverInfoBeanVo = PetRecoverInfoBeanVo;
            })(models = pet.models || (pet.models = {}));
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetRecoverInfoBeanVo.js.map