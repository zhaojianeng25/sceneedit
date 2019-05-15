/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var VipInfoBaseVo = /** @class */ (function () {
                function VipInfoBaseVo() {
                    this.itemids = []; //道具奖励1,道具奖励2,道具奖励3,道具奖励4,道具奖励5
                    this.itemcounts = []; //道具奖励1数量,道具奖励2数量,道具奖励3数量,道具奖励4数量,道具奖励5数量
                }
                VipInfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.exp = data.getUint32();
                    var listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.itemids.push(data.getUint32());
                    }
                    var listCount2 = data.getUint32();
                    for (var index = 0; index < listCount2; index++) {
                        this.itemcounts.push(data.getUint32());
                    }
                    this.type1 = data.getUTFBytes(data.getUint32());
                    this.type2 = data.getUTFBytes(data.getUint32());
                    this.type3 = data.getUTFBytes(data.getUint32());
                    this.limitnumber1 = data.getUint32();
                    this.limitnumber2 = data.getUint32();
                    this.petextracount = data.getUint32();
                    this.giftBagNum = data.getUint32();
                    this.bagextracount = data.getUint32();
                    this.dpotextracount = data.getUint32();
                };
                return VipInfoBaseVo;
            }());
            template.VipInfoBaseVo = VipInfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=VipInfoBaseVo.js.map