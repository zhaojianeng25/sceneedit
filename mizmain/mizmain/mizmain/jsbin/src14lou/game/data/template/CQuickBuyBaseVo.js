/**
* @Author: LinQiuWen
* @description:k快捷购买道具表
* D点卡服表格/DMT3快捷购买道具表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CQuickBuyBaseVo = /** @class */ (function () {
                function CQuickBuyBaseVo() {
                }
                CQuickBuyBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.buytype = data.getUint32();
                    this.goodsid = data.getUint32();
                };
                return CQuickBuyBaseVo;
            }());
            template.CQuickBuyBaseVo = CQuickBuyBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CQuickBuyBaseVo.js.map