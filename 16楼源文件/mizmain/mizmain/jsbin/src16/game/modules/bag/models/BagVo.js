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
                var BagVo = /** @class */ (function () {
                    //获取、设置属性
                    function BagVo() {
                        /**key 货币类型,参见MoneyType */
                        this.currency = {};
                    }
                    BagVo.prototype.fromByteArray = function (bytes) {
                        var mapSize = bytes.readUint8();
                        for (var index = 0; index < mapSize; index++) {
                            this.currency[bytes.readInt8()] = bytes.readLong();
                        }
                        this.capacity = bytes.readInt32();
                        this.items = [];
                        mapSize = bytes.readUint8();
                        var item;
                        for (var index = 0; index < mapSize; index++) {
                            item = new models.ItemVo();
                            item.fromByteArray(bytes);
                            this.items.push(item);
                        }
                    };
                    return BagVo;
                }());
                models.BagVo = BagVo;
            })(models = bag.models || (bag.models = {}));
        })(bag = modules.bag || (modules.bag = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BagVo.js.map