/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ItemTypeNameListBaseVo = /** @class */ (function () {
                function ItemTypeNameListBaseVo() {
                }
                ItemTypeNameListBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.itemtypename = data.getUTFBytes(data.getUint32());
                    var itemsLength = data.getUint32();
                    this.items = [];
                    for (var index = 0; index < itemsLength; index++) {
                        this.items.push(data.getUint32());
                    }
                };
                return ItemTypeNameListBaseVo;
            }());
            template.ItemTypeNameListBaseVo = ItemTypeNameListBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ItemTypeNameListBaseVo.js.map