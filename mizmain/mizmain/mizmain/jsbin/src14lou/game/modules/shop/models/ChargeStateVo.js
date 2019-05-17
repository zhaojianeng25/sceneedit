/**
* ChargeStateVo
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var shop;
        (function (shop) {
            var models;
            (function (models) {
                var ChargeStateVo = /** @class */ (function () {
                    function ChargeStateVo() {
                    }
                    ChargeStateVo.prototype.fromByteArray = function (bytes) {
                        this.state = bytes.readUint32();
                        this.flag = bytes.readUint32();
                    };
                    return ChargeStateVo;
                }());
                models.ChargeStateVo = ChargeStateVo;
            })(models = shop.models || (shop.models = {}));
        })(shop = modules.shop || (modules.shop = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ChargeStateVo.js.map