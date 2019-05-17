/**
* @Author: LinQiuWen
* @description:f福利奖励/签到奖励
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CqiandaojiangliBaseVo = /** @class */ (function () {
                function CqiandaojiangliBaseVo() {
                }
                CqiandaojiangliBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.itemId = data.getUint32();
                    this.itemNum = data.getUint32();
                    this.mtype = data.getUint32();
                    this.money = data.getUint32();
                    this.borderpic = data.getUTFBytes(data.getUint32());
                };
                return CqiandaojiangliBaseVo;
            }());
            template.CqiandaojiangliBaseVo = CqiandaojiangliBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CqiandaojiangliBaseVo.js.map