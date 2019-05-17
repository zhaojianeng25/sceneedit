/**
* name c宠物一级属性转换表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PetCPetAttrModDataBaseVo = /** @class */ (function () {
                function PetCPetAttrModDataBaseVo() {
                }
                PetCPetAttrModDataBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.consfactor = data.getFloat64();
                    this.iqfactor = data.getFloat64();
                    this.strfactor = data.getFloat64();
                    this.endufactor = data.getFloat64();
                    this.agifactor = data.getFloat64();
                };
                return PetCPetAttrModDataBaseVo;
            }());
            template.PetCPetAttrModDataBaseVo = PetCPetAttrModDataBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PetCPetAttrModDataBaseVo.js.map