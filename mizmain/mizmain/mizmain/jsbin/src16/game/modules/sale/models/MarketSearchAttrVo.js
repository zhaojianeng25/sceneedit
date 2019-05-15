/**
* 摆摊珍品装备搜索-基础属性结构
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var sale;
        (function (sale) {
            var models;
            (function (models) {
                var MarketSearchAttrVo = /** @class */ (function () {
                    function MarketSearchAttrVo() {
                    }
                    MarketSearchAttrVo.prototype.fromByteArray = function (bytes) {
                        this.attrid = bytes.readInt32();
                        this.attrval = bytes.readInt32();
                    };
                    MarketSearchAttrVo.prototype.writeByteArray = function (bytes) {
                        bytes.writeInt32(this.attrid);
                        bytes.writeInt32(this.attrval);
                    };
                    return MarketSearchAttrVo;
                }());
                models.MarketSearchAttrVo = MarketSearchAttrVo;
            })(models = sale.models || (sale.models = {}));
        })(sale = modules.sale || (modules.sale = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=MarketSearchAttrVo.js.map