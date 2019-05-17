/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var LifeSkillBaseVo = /** @class */ (function () {
                function LifeSkillBaseVo() {
                }
                LifeSkillBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.paixuID = data.getUint32();
                    this.icon = data.getUint32();
                    this.skillType = data.getUint32();
                    this.fumoItemID = data.getUint32();
                    this.needGuild = data.getUint32();
                    this.skillLevelMax = data.getUint32();
                    this.studyLevelRule = data.getUint32();
                    this.studyCostRule = data.getUint32();
                    this.strengthCostRule = data.getUint32();
                    this.upgradeDesc = data.getUTFBytes(data.getUint32());
                    this.upgradeVariable = data.getUint32();
                    this.upgradeDesc2 = data.getUTFBytes(data.getUint32());
                    this.upgradeVariable2 = data.getUint32();
                    this.upgradeDesc3 = data.getUTFBytes(data.getUint32());
                    this.upgradeVariable3 = data.getUint32();
                    this.upgradeDesc4 = data.getUTFBytes(data.getUint32());
                    this.upgradeVariable4 = data.getUint32();
                    this.skillId = data.getUint32();
                    this.bCanStudy = data.getUint32();
                    this.guidetips = data.getUTFBytes(data.getUint32());
                    this.description = data.getUTFBytes(data.getUint32());
                    this.brief = data.getUTFBytes(data.getUint32());
                    this.effect = data.getUTFBytes(data.getUint32());
                    this.effectnow = data.getUTFBytes(data.getUint32());
                    this.ParaNum = data.getUint32();
                    var ParaIndexListLength = data.getUint32();
                    this.ParaIndexList = [];
                    for (var index = 0; index < ParaIndexListLength; index++) {
                        this.ParaIndexList.push(data.getUint32());
                    }
                    this.bNeedSkilled = data.getUint32();
                    this.gangdescription = data.getUTFBytes(data.getUint32());
                    this.cureffect1 = data.getUTFBytes(data.getUint32());
                    this.cureffect2 = data.getUTFBytes(data.getUint32());
                    this.cureffect3 = data.getUTFBytes(data.getUint32());
                    this.cureffect4 = data.getUTFBytes(data.getUint32());
                    this.curid1 = data.getUTFBytes(data.getUint32());
                    this.curid2 = data.getUTFBytes(data.getUint32());
                    this.curid3 = data.getUTFBytes(data.getUint32());
                    this.curid4 = data.getUTFBytes(data.getUint32());
                    this.openlevel = data.getUint32();
                };
                return LifeSkillBaseVo;
            }());
            template.LifeSkillBaseVo = LifeSkillBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=LifeSkillBaseVo.js.map