/**
* FushiNumVo
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var shop;
        (function (shop) {
            var models;
            (function (models) {
                var FushiNumVo = /** @class */ (function () {
                    function FushiNumVo() {
                    }
                    FushiNumVo.prototype.fromByteArray = function (bytes) {
                        this.num = bytes.readInt32();
                        this.bindNum = bytes.readInt32();
                        this.totalnum = bytes.readInt32();
                    };
                    return FushiNumVo;
                }());
                models.FushiNumVo = FushiNumVo;
            })(models = shop.models || (shop.models = {}));
        })(shop = modules.shop || (modules.shop = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FushiNumVo.js.map