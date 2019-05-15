/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var LifeSkillCostBaseVo = /** @class */ (function () {
                function LifeSkillCostBaseVo() {
                }
                LifeSkillCostBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    var needLevelListLength = data.getUint32();
                    this.needLevelList = [];
                    for (var index = 0; index < needLevelListLength; index++) {
                        this.needLevelList.push(data.getUint32());
                    }
                    var silverCostListLength = data.getUint32();
                    this.silverCostList = [];
                    for (var index = 0; index < silverCostListLength; index++) {
                        this.silverCostList.push(data.getUint32());
                    }
                    var guildContributeCostListLength = data.getUint32();
                    this.guildContributeCostList = [];
                    for (var index = 0; index < guildContributeCostListLength; index++) {
                        this.guildContributeCostList.push(data.getUint32());
                    }
                    var strengthCostListLength = data.getUint32();
                    this.strengthCostList = [];
                    for (var index = 0; index < strengthCostListLength; index++) {
                        this.strengthCostList.push(data.getUint32());
                    }
                    var silverCostListTypeLength = data.getUint32();
                    this.silverCostListType = [];
                    for (var index = 0; index < silverCostListTypeLength; index++) {
                        this.silverCostListType.push(data.getUint32());
                    }
                };
                return LifeSkillCostBaseVo;
            }());
            template.LifeSkillCostBaseVo = LifeSkillCostBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=LifeSkillCostBaseVo.js.map