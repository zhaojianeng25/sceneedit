/**
* @Author: LinQiuWen
* @description:k跨服/K跨服天梯数据表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CTTInfoBaseVo = /** @class */ (function () {
                function CTTInfoBaseVo() {
                    this.bonusid = []; //道具奖励1,道具奖励2,道具奖励3,道具奖励4,道具奖励5
                    this.bounuscount = []; //道具奖励1数量,道具奖励2数量,道具奖励3数量,道具奖励4数量,道具奖励5数量
                }
                CTTInfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.ttname = data.getUTFBytes(data.getUint32());
                    this.strimage = data.getUTFBytes(data.getUint32());
                    this.strimagestar = data.getUTFBytes(data.getUint32());
                    this.score = data.getUint32();
                    var length = data.getUint32();
                    for (var index = 0; index < length; index++) {
                        this.bonusid.push(data.getUint32());
                    }
                    length = data.getUint32();
                    for (var index = 0; index < length; index++) {
                        this.bounuscount.push(data.getUint32());
                    }
                };
                return CTTInfoBaseVo;
            }());
            template.CTTInfoBaseVo = CTTInfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CTTInfoBaseVo.js.map