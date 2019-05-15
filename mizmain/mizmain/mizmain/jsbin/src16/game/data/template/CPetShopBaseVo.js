/**
* @Author: LinQiuWen
* @description:s商店商城商会表/cMT3宠物商店表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CPetShopBaseVo = /** @class */ (function () {
                function CPetShopBaseVo() {
                    this.goodsids = []; //商品ID1,商品ID2,商品ID3
                }
                CPetShopBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.limitLookLv = data.getUint32();
                    this.showLv = data.getUint32();
                    var length = data.getUint32();
                    for (var index = 0; index < length; index++) {
                        this.goodsids.push(data.getUint32());
                    }
                };
                return CPetShopBaseVo;
            }());
            template.CPetShopBaseVo = CPetShopBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CPetShopBaseVo.js.map