/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PetSkillupgradeBaseVo = /** @class */ (function () {
                function PetSkillupgradeBaseVo() {
                }
                PetSkillupgradeBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.nextid = data.getUint32();
                    this.book = data.getUint32();
                    this.needexp = data.getUint32();
                    this.offerbaseexp = data.getUint32();
                    this.skilllevel = data.getUint32();
                    this.sign = data.getUint32();
                    this.iscanremovable = data.getUint32();
                    this.range = data.getUint32();
                    this.iscancertification = data.getUint32();
                    this.iscertificationappend = data.getUint32();
                };
                return PetSkillupgradeBaseVo;
            }());
            template.PetSkillupgradeBaseVo = PetSkillupgradeBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PetSkillupgradeBaseVo.js.map