/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var HydScoreBaseVo = /** @class */ (function () {
                function HydScoreBaseVo() {
                    this.hydscore = []; //节日积分1,节日积分2,节日积分3,节日积分4,节日积分5
                    this.itemid = []; //类型1奖励道具ID,类型2奖励道具ID,类型3奖励道具ID,类型4奖励道具ID,类型5奖励道具ID
                    this.itemnum = []; //类型1道具数量,类型2道具数量,类型3道具数量,类型4道具数量,类型5道具数量
                    this.itembind = []; //类型1道具是否绑定,类型2道具是否绑定,类型3道具是否绑定,类型4道具是否绑定,类型5道具是否绑定
                }
                HydScoreBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.starttime = data.getUTFBytes(data.getUint32());
                    this.endtime = data.getUTFBytes(data.getUint32());
                    var list1 = data.getUint32();
                    for (var index = 0; index < list1; index++) {
                        this.hydscore.push(data.getUint32());
                    }
                    var list2 = data.getUint32();
                    for (var index = 0; index < list2; index++) {
                        this.itemid.push(data.getUint32());
                    }
                    var list3 = data.getUint32();
                    for (var index = 0; index < list3; index++) {
                        this.itemnum.push(data.getUint32());
                    }
                    var list4 = data.getUint32();
                    for (var index = 0; index < list4; index++) {
                        this.itembind.push(data.getUint32());
                    }
                    this.title = data.getUTFBytes(data.getUint32());
                    this.desc = data.getUTFBytes(data.getUint32());
                };
                return HydScoreBaseVo;
            }());
            template.HydScoreBaseVo = HydScoreBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=HydScoreBaseVo.js.map