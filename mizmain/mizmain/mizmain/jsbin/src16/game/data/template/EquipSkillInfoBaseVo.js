/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var EquipSkillInfoBaseVo = /** @class */ (function () {
                function EquipSkillInfoBaseVo() {
                }
                EquipSkillInfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                };
                return EquipSkillInfoBaseVo;
            }());
            template.EquipSkillInfoBaseVo = EquipSkillInfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=EquipSkillInfoBaseVo.js.map