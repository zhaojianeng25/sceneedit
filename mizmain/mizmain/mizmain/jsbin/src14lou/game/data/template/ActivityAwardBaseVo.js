/**
* @Author: LinQiuWen
* @description:
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ActivityAwardBaseVo = /** @class */ (function () {
                function ActivityAwardBaseVo() {
                    this.firstClassAward = []; //必给物品1类ID,必给物品1类数量,必给物品1类属性,必给物品1类属性值,必给物品2类ID,必给物品2类数量,必给物品2类属性,必给物品2类属性值,必给物品3类ID,必给物品3类数量,必给物品3类属性,必给物品3类属性值,必给物品4类ID,必给物品4类数量,必给物品4类属性,必给物品4类属性值
                    this.secondClassAward = []; //物品1类,物品1类数量,物品2类,物品2类数量,物品3类,物品3类数量,物品4类,物品4类数量,物品5类,物品5类数量,物品6类,物品6类数量,物品7类,物品7类数量,物品8类,物品8类数量
                    this.secondClassAwardProb = []; //物品1类掉率,物品2类掉率,物品3类掉率,物品4类掉率,物品5类掉率,物品6类掉率,物品7类掉率,物品8类掉率
                }
                ActivityAwardBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.msgitemid = data.getUTFBytes(data.getUint32());
                    var firstClassAwardLength = data.getUint32();
                    for (var index = 0; index < firstClassAwardLength; index++) {
                        this.firstClassAward.push(data.getUint32());
                    }
                    var secondClassAwardLength = data.getUint32();
                    for (var index = 0; index < secondClassAwardLength; index++) {
                        this.secondClassAward.push(data.getUint32());
                    }
                    var secondClassAwardProbLength = data.getUint32();
                    for (var index = 0; index < secondClassAwardProbLength; index++) {
                        this.secondClassAwardProb.push(data.getUTFBytes(data.getUint32()));
                    }
                    this.secondClassDenominator = data.getUint32();
                    this.randomType = data.getUint32();
                    this.totalProb = data.getUTFBytes(data.getUint32());
                    this.tempBag = data.getUint32();
                };
                return ActivityAwardBaseVo;
            }());
            template.ActivityAwardBaseVo = ActivityAwardBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ActivityAwardBaseVo.js.map