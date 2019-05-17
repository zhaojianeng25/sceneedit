/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var EquipRefineSkillInfoBaseVo = /** @class */ (function () {
                function EquipRefineSkillInfoBaseVo() {
                }
                EquipRefineSkillInfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.partid = data.getUint32();
                    this.quality = data.getUint32();
                    this.cailiaoid = data.getUint32();
                    this.cailiaonum = data.getUint32();
                    this.moneytype = data.getUint32();
                    this.moneynum = data.getUint32();
                    var skillidsLength = data.getUint32();
                    this.skillids = [];
                    for (var index = 0; index < skillidsLength; index++) {
                        this.skillids.push(data.getUint32());
                    }
                    var skillidratesLength = data.getUint32();
                    this.skillidrates = [];
                    for (var index = 0; index < skillidratesLength; index++) {
                        this.skillidrates.push(data.getUint32());
                    }
                };
                return EquipRefineSkillInfoBaseVo;
            }());
            template.EquipRefineSkillInfoBaseVo = EquipRefineSkillInfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=EquipRefineSkillInfoBaseVo.js.map