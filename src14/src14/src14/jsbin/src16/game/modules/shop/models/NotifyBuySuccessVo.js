/**
* NotifyBuySuccessVo
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var shop;
        (function (shop) {
            var models;
            (function (models) {
                var NotifyBuySuccessVo = /** @class */ (function () {
                    function NotifyBuySuccessVo() {
                    }
                    NotifyBuySuccessVo.prototype.fromByteArray = function (bytes) {
                        this.notifytype = bytes.readInt32();
                        this.name = ByteArrayUtils.readUtf16String(bytes);
                        this.number = bytes.readInt32();
                        this.money = bytes.readInt32();
                        this.currency = bytes.readInt32();
                        this.itemorpet = bytes.readInt32();
                        this.units = ByteArrayUtils.readUtf16String(bytes);
                    };
                    return NotifyBuySuccessVo;
                }());
                models.NotifyBuySuccessVo = NotifyBuySuccessVo;
            })(models = shop.models || (shop.models = {}));
        })(shop = modules.shop || (modules.shop = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=NotifyBuySuccessVo.js.map