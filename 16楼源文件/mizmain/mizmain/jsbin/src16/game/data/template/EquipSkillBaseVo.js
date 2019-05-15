/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var EquipSkillBaseVo = /** @class */ (function () {
                function EquipSkillBaseVo() {
                }
                EquipSkillBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.icon = data.getUint32();
                    this.skilltype = data.getUint32();
                    this.cost = data.getUTFBytes(data.getUint32());
                    this.costnum = data.getUint32();
                    this.costType = data.getUint32();
                    this.describe = data.getUTFBytes(data.getUint32());
                    this.targettype = data.getUint32();
                    this.effectid = data.getUint32();
                };
                return EquipSkillBaseVo;
            }());
            template.EquipSkillBaseVo = EquipSkillBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=EquipSkillBaseVo.js.map