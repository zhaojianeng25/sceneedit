/**
* 摆摊信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var sale;
        (function (sale) {
            var models;
            (function (models) {
                var MarketGoodsVo = /** @class */ (function () {
                    function MarketGoodsVo() {
                    }
                    MarketGoodsVo.prototype.fromByteArray = function (bytes) {
                        this.id = bytes.readLong();
                        this.saleRoleid = bytes.readLong();
                        this.itemid = bytes.readInt32();
                        this.num = bytes.readInt32();
                        this.noticenum = bytes.readInt32();
                        this.key = bytes.readInt32();
                        this.price = bytes.readInt32();
                        this.showtime = bytes.readLong();
                        this.expiretime = bytes.readLong();
                        this.itemtype = bytes.readInt32();
                        this.level = bytes.readInt32();
                        this.attentionnumber = bytes.readInt32();
                    };
                    return MarketGoodsVo;
                }());
                models.MarketGoodsVo = MarketGoodsVo;
            })(models = sale.models || (sale.models = {}));
        })(sale = modules.sale || (modules.sale = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=MarketGoodsVo.js.map