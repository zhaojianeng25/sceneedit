/**
* @Author: LinQiuWen
* @description:s商店商城商会表/bMT3摆摊三级表
* D点卡服表格/DMT3点卡服摆摊三级表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CMarketThreeTableBaseVo = /** @class */ (function () {
                function CMarketThreeTableBaseVo() {
                    this.valuerange = []; //区间1,区间2,区间3,区间4,区间5,区间6,区间7,区间8,区间9,区间10,区间11,区间12
                }
                CMarketThreeTableBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.itemid = data.getUint32();
                    this.itemtype = data.getUint32();
                    this.logictype = data.getUint32();
                    this.israrity = data.getUint32();
                    this.firstno = data.getUint32();
                    this.twono = data.getUint32();
                    this.limitlooklv = data.getUint32();
                    this.buylvmin = data.getUint32();
                    this.buylvmax = data.getUint32();
                    this.value = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    var length = data.getUint32();
                    for (var index = 0; index < length; index++) {
                        this.valuerange.push(data.getUint32());
                    }
                    //    this.valuerange
                    this.cansale = data.getUint32();
                };
                return CMarketThreeTableBaseVo;
            }());
            template.CMarketThreeTableBaseVo = CMarketThreeTableBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CMarketThreeTableBaseVo.js.map