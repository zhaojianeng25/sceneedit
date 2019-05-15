/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var EquipPosNameBaseVo = /** @class */ (function () {
                function EquipPosNameBaseVo() {
                }
                EquipPosNameBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.strname = data.getUTFBytes(data.getUint32());
                };
                return EquipPosNameBaseVo;
            }());
            template.EquipPosNameBaseVo = EquipPosNameBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=EquipPosNameBaseVo.js.map