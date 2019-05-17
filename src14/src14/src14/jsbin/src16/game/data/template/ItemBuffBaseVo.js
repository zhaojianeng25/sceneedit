/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ItemBuffBaseVo = /** @class */ (function () {
                function ItemBuffBaseVo() {
                }
                ItemBuffBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    var monsteridsLength = data.getUint32();
                    this.monsterids = [];
                    for (var index = 0; index < monsteridsLength; index++) {
                        this.monsterids.push(data.getUint32());
                    }
                    this.msgid = data.getUint32();
                };
                return ItemBuffBaseVo;
            }());
            template.ItemBuffBaseVo = ItemBuffBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ItemBuffBaseVo.js.map