/**
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var bag;
        (function (bag) {
            var models;
            (function (models) {
                var ItemVo = /** @class */ (function () {
                    function ItemVo() {
                    }
                    ItemVo.prototype.fromByteArray = function (bytes) {
                        this.id = bytes.readInt32();
                        this.flags = bytes.readInt32();
                        this.key = bytes.readInt32();
                        this.position = bytes.readInt32();
                        this.number = bytes.readInt32();
                        this.timeout = bytes.readLong();
                        this.isnew = bytes.readInt32();
                        this.loseeffecttime = bytes.readLong();
                        this.markettime = bytes.readLong();
                    };
                    return ItemVo;
                }());
                models.ItemVo = ItemVo;
            })(models = bag.models || (bag.models = {}));
        })(bag = modules.bag || (modules.bag = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ItemVo.js.map