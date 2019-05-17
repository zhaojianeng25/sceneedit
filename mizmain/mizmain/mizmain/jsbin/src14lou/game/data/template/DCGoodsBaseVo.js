/**
* @Author: LinQiuWen
* @description:
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var DCGoodsBaseVo = /** @class */ (function () {
                function DCGoodsBaseVo() {
                    this.currencys = []; //货币1,货币2
                    this.oldprices = []; //价格1,价格2
                    this.prices = []; //现价1,现价2
                }
                DCGoodsBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.type = data.getUint32();
                    this.itemId = data.getUint32();
                    var length = data.getUint32();
                    for (var index = 0; index < length; index++) {
                        this.currencys.push(data.getUint32());
                    }
                    length = data.getUint32();
                    for (var index = 0; index < length; index++) {
                        this.oldprices.push(data.getUint32());
                    }
                    length = data.getUint32();
                    for (var index = 0; index < length; index++) {
                        this.prices.push(data.getUint32());
                    }
                    this.limitType = data.getUint32();
                    this.limitNum = data.getUint32();
                    this.limitSaleNum = data.getUint32();
                    this.limitLookLv = data.getUint32();
                    this.lvMin = data.getUint32();
                    this.lvMax = data.getUint32();
                    this.floatingprice = data.getFloat64();
                    this.des = data.getUTFBytes(data.getUint32());
                };
                return DCGoodsBaseVo;
            }());
            template.DCGoodsBaseVo = DCGoodsBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=DCGoodsBaseVo.js.map