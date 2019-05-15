/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ItemToPosBaseVo = /** @class */ (function () {
                function ItemToPosBaseVo() {
                }
                ItemToPosBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.mapRemotePos = data.getUint32();
                };
                return ItemToPosBaseVo;
            }());
            template.ItemToPosBaseVo = ItemToPosBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ItemToPosBaseVo.js.map