/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PetEquipHeChengBaseVo = /** @class */ (function () {
                function PetEquipHeChengBaseVo() {
                }
                PetEquipHeChengBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.money = data.getUint32();
                    this.moneytype = data.getUint32();
                    this.nextid = data.getUint32();
                };
                return PetEquipHeChengBaseVo;
            }());
            template.PetEquipHeChengBaseVo = PetEquipHeChengBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PetEquipHeChengBaseVo.js.map