/**
* name 新增物品VO
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var bag;
        (function (bag) {
            var models;
            (function (models) {
                var ItemAddVo = /** @class */ (function () {
                    function ItemAddVo() {
                    }
                    ItemAddVo.prototype.fromByteArray = function (bytes) {
                        this.itemid = bytes.readInt32();
                        this.itemnum = bytes.readInt32();
                    };
                    return ItemAddVo;
                }());
                models.ItemAddVo = ItemAddVo;
            })(models = bag.models || (bag.models = {}));
        })(bag = modules.bag || (modules.bag = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ItemAddVo.js.map