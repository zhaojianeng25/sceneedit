/**
* 商品
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet) {
            var models;
            (function (models) {
                var GoodsVo = /** @class */ (function () {
                    function GoodsVo() {
                    }
                    GoodsVo.prototype.fromByteArray = function (byte) {
                        this.goodsid = byte.readInt32();
                        this.price = byte.readInt32();
                        this.priorperiodprice = byte.readInt32();
                    };
                    return GoodsVo;
                }());
                models.GoodsVo = GoodsVo;
            })(models = pet.models || (pet.models = {}));
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=GoodsVo.js.map