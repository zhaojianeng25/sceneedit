/**
* @Author: LinQiuWen
* @description:
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var EquipEffectConfigBaseVo = /** @class */ (function () {
                function EquipEffectConfigBaseVo() {
                }
                EquipEffectConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.equipNum = data.getUint32();
                    this.quality = data.getUint32();
                    this.effectId = data.getUint32();
                };
                return EquipEffectConfigBaseVo;
            }());
            template.EquipEffectConfigBaseVo = EquipEffectConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=EquipEffectConfigBaseVo.js.map