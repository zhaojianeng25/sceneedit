/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ChargeReturnProfitBaseVo = /** @class */ (function () {
                function ChargeReturnProfitBaseVo() {
                    this.rewarditems = []; //奖励1,奖励2
                    this.rewardnums = []; //奖励1数量,奖励2数量
                }
                ChargeReturnProfitBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.chargevalue = data.getUint32();
                    var rewarditems1 = data.getUint32();
                    for (var index = 0; index < rewarditems1; index++) {
                        this.rewarditems.push(data.getUint32());
                    }
                    var rewardnums1 = data.getUint32();
                    for (var index = 0; index < rewardnums1; index++) {
                        this.rewardnums.push(data.getUint32());
                    }
                    this.text = data.getUTFBytes(data.getUint32());
                };
                return ChargeReturnProfitBaseVo;
            }());
            template.ChargeReturnProfitBaseVo = ChargeReturnProfitBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ChargeReturnProfitBaseVo.js.map