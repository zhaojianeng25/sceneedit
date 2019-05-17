/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PetEquipSuitBuffBaseVo = /** @class */ (function () {
                function PetEquipSuitBuffBaseVo() {
                }
                PetEquipSuitBuffBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.nbuffid = data.getUint32();
                    this.npropertyid = data.getUint32();
                    this.naddvalue = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.desc = data.getUTFBytes(data.getUint32());
                    this.item1 = data.getUint32();
                    this.item2 = data.getUint32();
                    this.item3 = data.getUint32();
                    this.item4 = data.getUint32();
                    this.prop = data.getUTFBytes(data.getUint32());
                };
                return PetEquipSuitBuffBaseVo;
            }());
            template.PetEquipSuitBuffBaseVo = PetEquipSuitBuffBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PetEquipSuitBuffBaseVo.js.map