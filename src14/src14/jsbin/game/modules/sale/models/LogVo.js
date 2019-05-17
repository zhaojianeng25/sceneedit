/**
* 交易记录
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var sale;
        (function (sale) {
            var models;
            (function (models) {
                var LogVo = /** @class */ (function () {
                    function LogVo() {
                    }
                    LogVo.prototype.fromByteArray = function (bytes) {
                        this.itemid = bytes.readInt32();
                        this.num = bytes.readInt32();
                        this.price = bytes.readInt32();
                        this.level = bytes.readInt32();
                    };
                    return LogVo;
                }());
                models.LogVo = LogVo;
            })(models = sale.models || (sale.models = {}));
        })(sale = modules.sale || (modules.sale = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=LogVo.js.map