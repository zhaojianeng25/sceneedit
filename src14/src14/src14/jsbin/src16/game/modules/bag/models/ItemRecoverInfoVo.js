var game;
(function (game) {
    var modules;
    (function (modules) {
        var bag;
        (function (bag) {
            var models;
            (function (models) {
                /** 珍品找回信息Vo */
                var ItemRecoverInfoVo = /** @class */ (function () {
                    function ItemRecoverInfoVo() {
                    }
                    ItemRecoverInfoVo.prototype.fromByteArray = function (bytes) {
                        this.itemId = bytes.readInt32();
                        this.uniqId = bytes.readLong();
                        this.remainTime = bytes.readInt32();
                        this.cost = bytes.readInt32();
                    };
                    return ItemRecoverInfoVo;
                }());
                models.ItemRecoverInfoVo = ItemRecoverInfoVo;
            })(models = bag.models || (bag.models = {}));
        })(bag = modules.bag || (modules.bag = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ItemRecoverInfoVo.js.map