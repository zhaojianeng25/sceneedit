/**
* GoodInfoVo
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var shop;
        (function (shop) {
            var models;
            (function (models) {
                var GoodInfoVo = /** @class */ (function () {
                    function GoodInfoVo() {
                    }
                    GoodInfoVo.prototype.fromByteArray = function (bytes) {
                        this.goodid = bytes.readUint32();
                        this.price = bytes.readUint32();
                        this.fushi = bytes.readUint32();
                        this.present = bytes.readUint32();
                        this.beishu = bytes.readUint32();
                    };
                    return GoodInfoVo;
                }());
                models.GoodInfoVo = GoodInfoVo;
            })(models = shop.models || (shop.models = {}));
        })(shop = modules.shop || (modules.shop = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=GoodInfoVo.js.map