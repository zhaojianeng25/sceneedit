/**
* @Author: LinQiuWen
* @description:D点卡服表格/DMT3点卡服道具商城售卖配置表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var DCMallShopBaseVo = /** @class */ (function () {
                function DCMallShopBaseVo() {
                }
                DCMallShopBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.order = data.getUint32();
                    this.type = data.getUint32();
                    this.totalrecharge = data.getUint32();
                    this.des = data.getUTFBytes(data.getUint32());
                    this.cuxiaotype = data.getUint32();
                };
                return DCMallShopBaseVo;
            }());
            template.DCMallShopBaseVo = DCMallShopBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=DCMallShopBaseVo.js.map