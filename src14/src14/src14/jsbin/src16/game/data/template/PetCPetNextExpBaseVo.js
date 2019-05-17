/**
* name c宠物升级经验表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PetCPetNextExpBaseVo = /** @class */ (function () {
                function PetCPetNextExpBaseVo() {
                }
                PetCPetNextExpBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.exp = data.getUint32();
                };
                return PetCPetNextExpBaseVo;
            }());
            template.PetCPetNextExpBaseVo = PetCPetNextExpBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PetCPetNextExpBaseVo.js.map