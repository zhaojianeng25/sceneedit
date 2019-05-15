/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ItemToItemBaseVo = /** @class */ (function () {
                function ItemToItemBaseVo() {
                }
                ItemToItemBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    var itemsidLength = data.getUint32();
                    this.itemsid = [];
                    for (var index = 0; index < itemsidLength; index++) {
                        this.itemsid.push(data.getUint32());
                    }
                };
                return ItemToItemBaseVo;
            }());
            template.ItemToItemBaseVo = ItemToItemBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ItemToItemBaseVo.js.map