/**
* @Author: LinQiuWen
* @description:s商店商城商会表/cMT3神兽商店表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CShenShouShopBaseVo = /** @class */ (function () {
                function CShenShouShopBaseVo() {
                    this.goodsids = []; //商品ID1,商品ID2,商品ID3,商品ID4,商品ID5,商品ID6,商品ID7,商品ID8,商品ID9,商品ID10
                }
                CShenShouShopBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.shopid = data.getUint32();
                    this.visiblelevel = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.npcid = data.getUint32();
                    var length = data.getUint32();
                    for (var index = 0; index < length; index++) {
                        this.goodsids.push(data.getUint32());
                    }
                };
                return CShenShouShopBaseVo;
            }());
            template.CShenShouShopBaseVo = CShenShouShopBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CShenShouShopBaseVo.js.map