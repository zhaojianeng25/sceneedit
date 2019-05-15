/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ItemTypeBaseVo = /** @class */ (function () {
                function ItemTypeBaseVo() {
                }
                ItemTypeBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.weapon = data.getUTFBytes(data.getUint32());
                };
                return ItemTypeBaseVo;
            }());
            template.ItemTypeBaseVo = ItemTypeBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ItemTypeBaseVo.js.map