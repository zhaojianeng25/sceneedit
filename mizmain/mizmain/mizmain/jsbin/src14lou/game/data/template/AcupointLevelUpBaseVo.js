/**
* @Author: LinQiuWen
* @description:j技能格系统/技能格消耗表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var AcupointLevelUpBaseVo = /** @class */ (function () {
                function AcupointLevelUpBaseVo() {
                    this.needExp = []; //第一重经验,第二重经验,第三重经验,第四重经验,第五重经验,第六重经验,第七重经验
                    this.needMoney = []; //第一重金钱,第二重金钱,第三重金钱,第四重金钱,第五重金钱,第六重金钱,第七重金钱
                    this.needQihai = []; //第二重气海值,第三重气海值,第四重气海值,第五重气海值,第六重气海值,第七重气海值"
                    this.moneyCostRule = []; //金钱消耗规则1,金钱消耗规则2,金钱消耗规则3
                    this.moneyCostRuleType = []; //金钱消耗类型1,金钱消耗类型2,金钱消耗类型3
                }
                AcupointLevelUpBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.level = data.getUint32();
                    var needExpLength = data.getUint32();
                    for (var index = 0; index < needExpLength; index++) {
                        this.needExp.push(data.getUint32());
                    }
                    var needMoneyLength = data.getUint32();
                    for (var index = 0; index < needMoneyLength; index++) {
                        this.needMoney.push(data.getUint32());
                    }
                    var needQiHaiLength = data.getUint32();
                    for (var index = 0; index < needQiHaiLength; index++) {
                        this.needQihai.push(data.getUint32());
                    }
                    var moneyCostRuleLength = data.getUint32();
                    for (var index = 0; index < moneyCostRuleLength; index++) {
                        this.moneyCostRule.push(data.getUint32());
                    }
                    var moneyCostRuleTypeLength = data.getUint32();
                    for (var index = 0; index < moneyCostRuleTypeLength; index++) {
                        this.moneyCostRuleType.push(data.getUint32());
                    }
                };
                return AcupointLevelUpBaseVo;
            }());
            template.AcupointLevelUpBaseVo = AcupointLevelUpBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=AcupointLevelUpBaseVo.js.map