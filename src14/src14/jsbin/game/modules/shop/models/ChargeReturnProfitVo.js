/**
* ChargeReturnProfitVo
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var shop;
        (function (shop) {
            var models;
            (function (models) {
                var ChargeReturnProfitVo = /** @class */ (function () {
                    function ChargeReturnProfitVo() {
                    }
                    ChargeReturnProfitVo.prototype.fromByteArray = function (bytes) {
                        this.id = bytes.readInt32();
                        this.value = bytes.readInt32();
                        this.maxvalue = bytes.readInt32();
                        this.status = bytes.readInt32();
                    };
                    return ChargeReturnProfitVo;
                }());
                models.ChargeReturnProfitVo = ChargeReturnProfitVo;
            })(models = shop.models || (shop.models = {}));
        })(shop = modules.shop || (modules.shop = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ChargeReturnProfitVo.js.map