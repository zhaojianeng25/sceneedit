/**
*宠物技能
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet) {
            var models;
            (function (models) {
                var PetSkillVo = /** @class */ (function () {
                    function PetSkillVo() {
                    }
                    PetSkillVo.prototype.fromByteArray = function (bytes) {
                        this.skillId = bytes.readInt32();
                        this.skillexp = bytes.readInt32();
                        this.skilltype = bytes.readByte();
                        this.certification = bytes.readByte();
                    };
                    return PetSkillVo;
                }());
                models.PetSkillVo = PetSkillVo;
            })(models = pet.models || (pet.models = {}));
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetSkillVo.js.map