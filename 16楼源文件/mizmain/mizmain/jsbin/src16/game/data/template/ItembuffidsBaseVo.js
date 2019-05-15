/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ItembuffidsBaseVo = /** @class */ (function () {
                function ItembuffidsBaseVo() {
                }
                ItembuffidsBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    var buffidsLength = data.getUint32();
                    this.buffids = [];
                    for (var index = 0; index < buffidsLength; index++) {
                        this.buffids.push(data.getUint32());
                    }
                };
                return ItembuffidsBaseVo;
            }());
            template.ItembuffidsBaseVo = ItembuffidsBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ItembuffidsBaseVo.js.map