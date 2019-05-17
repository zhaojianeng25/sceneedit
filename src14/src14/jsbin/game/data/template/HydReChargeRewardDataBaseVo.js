/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var HydReChargeRewardDataBaseVo = /** @class */ (function () {
                function HydReChargeRewardDataBaseVo() {
                    this.rechargevalue = []; //充值金额类型1,充值金额类型2,充值金额类型3,充值金额类型4,充值金额类型5,充值金额类型6
                    this.rewarditemid1 = []; //类型1奖励道具ID1,类型2奖励道具ID1,类型3奖励道具ID1,类型4奖励道具ID1,类型5奖励道具ID1,类型6奖励道具ID1
                    this.rewarditemnum1 = []; //类型1道具数量1,类型2道具数量1,类型3道具数量1,类型4道具数量1,类型5道具数量1,类型6道具数量1
                    this.rewarditembind1 = []; //类型1道具是否绑定1,类型2道具是否绑定1,类型3道具是否绑定1,类型4道具是否绑定1,类型5道具是否绑定1,类型6道具是否绑定1
                    this.rewarditemid2 = []; //类型1奖励道具ID2,类型2奖励道具ID2,类型3奖励道具ID2,类型4奖励道具ID2,类型5奖励道具ID2,类型6奖励道具ID2
                    this.rewarditemnum2 = []; //类型1道具数量2,类型2道具数量2,类型3道具数量2,类型4道具数量2,类型5道具数量2,类型6道具数量2
                    this.rewarditembind2 = []; //类型1道具是否绑定2,类型2道具是否绑定2,类型3道具是否绑定2,类型4道具是否绑定2,类型5道具是否绑定2,类型6道具是否绑定2
                    this.rewarditemid3 = []; //类型1奖励道具ID3,类型2奖励道具ID3,类型3奖励道具ID3,类型4奖励道具ID3,类型5奖励道具ID3,类型6奖励道具ID3
                    this.rewarditemnum3 = []; //类型1道具数量3,类型2道具数量3,类型3道具数量3,类型4道具数量3,类型5道具数量3,类型6道具数量3
                    this.rewarditembind3 = []; //类型1道具是否绑定3,类型2道具是否绑定3,类型3道具是否绑定3,类型4道具是否绑定3,类型5道具是否绑定3,类型6道具是否绑定3
                    this.rewarditemid4 = []; //类型1奖励道具ID4,类型2奖励道具ID4,类型3奖励道具ID4,类型4奖励道具ID4,类型5奖励道具ID4,类型6奖励道具ID4
                    this.rewarditemnum4 = []; //类型1道具数量4,类型2道具数量4,类型3道具数量4,类型4道具数量4,类型5道具数量4,类型6道具数量4
                    this.rewarditembind4 = []; //类型1道具是否绑定4,类型2道具是否绑定4,类型3道具是否绑定4,类型4道具是否绑定4,类型5道具是否绑定4,类型6道具是否绑定4
                }
                HydReChargeRewardDataBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.starttime = data.getUTFBytes(data.getUint32());
                    this.endtime = data.getUTFBytes(data.getUint32());
                    var list1 = data.getUint32();
                    for (var index = 0; index < list1; index++) {
                        this.rechargevalue.push(data.getUint32());
                    }
                    var list2 = data.getUint32();
                    for (var index = 0; index < list2; index++) {
                        this.rewarditemid1.push(data.getUint32());
                    }
                    var list3 = data.getUint32();
                    for (var index = 0; index < list3; index++) {
                        this.rewarditemnum1.push(data.getUint32());
                    }
                    var list4 = data.getUint32();
                    for (var index = 0; index < list4; index++) {
                        this.rewarditembind1.push(data.getUint32());
                    }
                    var list5 = data.getUint32();
                    for (var index = 0; index < list5; index++) {
                        this.rewarditemid2.push(data.getUint32());
                    }
                    var list6 = data.getUint32();
                    for (var index = 0; index < list6; index++) {
                        this.rewarditemnum2.push(data.getUint32());
                    }
                    var list7 = data.getUint32();
                    for (var index = 0; index < list7; index++) {
                        this.rewarditembind2.push(data.getUint32());
                    }
                    var list8 = data.getUint32();
                    for (var index = 0; index < list8; index++) {
                        this.rewarditemid3.push(data.getUint32());
                    }
                    var list9 = data.getUint32();
                    for (var index = 0; index < list9; index++) {
                        this.rewarditemnum3.push(data.getUint32());
                    }
                    var list10 = data.getUint32();
                    for (var index = 0; index < list10; index++) {
                        this.rewarditembind3.push(data.getUint32());
                    }
                    var list11 = data.getUint32();
                    for (var index = 0; index < list11; index++) {
                        this.rewarditemid4.push(data.getUint32());
                    }
                    var list12 = data.getUint32();
                    for (var index = 0; index < list12; index++) {
                        this.rewarditemnum4.push(data.getUint32());
                    }
                    var list13 = data.getUint32();
                    for (var index = 0; index < list13; index++) {
                        this.rewarditembind4.push(data.getUint32());
                    }
                };
                return HydReChargeRewardDataBaseVo;
            }());
            template.HydReChargeRewardDataBaseVo = HydReChargeRewardDataBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=HydReChargeRewardDataBaseVo.js.map