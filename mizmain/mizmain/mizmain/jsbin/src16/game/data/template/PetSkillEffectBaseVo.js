/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PetSkillEffectBaseVo = /** @class */ (function () {
                function PetSkillEffectBaseVo() {
                }
                PetSkillEffectBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    var attrsLength = data.getUint32();
                    this.attrs = [];
                    for (var index = 0; index < attrsLength; index++) {
                        this.attrs.push(data.getUint32());
                    }
                    var formulasLength = data.getUint32();
                    this.formulas = [];
                    for (var index = 0; index < formulasLength; index++) {
                        this.formulas.push(data.getUTFBytes(data.getUint32()));
                    }
                };
                return PetSkillEffectBaseVo;
            }());
            template.PetSkillEffectBaseVo = PetSkillEffectBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PetSkillEffectBaseVo.js.map