/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ItemUseTipBaseVo = /** @class */ (function () {
                function ItemUseTipBaseVo() {
                }
                ItemUseTipBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.kind = data.getUint32();
                    this.idnum = data.getUint32();
                };
                return ItemUseTipBaseVo;
            }());
            template.ItemUseTipBaseVo = ItemUseTipBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ItemUseTipBaseVo.js.map