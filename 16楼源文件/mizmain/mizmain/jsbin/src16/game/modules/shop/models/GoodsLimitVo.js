/**
* GoodsLimitVo
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var shop;
        (function (shop) {
            var models;
            (function (models) {
                var GoodsLimitVo = /** @class */ (function () {
                    function GoodsLimitVo() {
                    }
                    GoodsLimitVo.prototype.fromByteArray = function (bytes) {
                        this.goodsid = bytes.readUint32();
                        this.number = bytes.readUint32();
                    };
                    return GoodsLimitVo;
                }());
                models.GoodsLimitVo = GoodsLimitVo;
            })(models = shop.models || (shop.models = {}));
        })(shop = modules.shop || (modules.shop = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=GoodsLimitVo.js.map