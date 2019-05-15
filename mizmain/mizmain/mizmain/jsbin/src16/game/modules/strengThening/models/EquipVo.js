/**
* 装备tips
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var strengThening;
        (function (strengThening) {
            var models;
            (function (models) {
                var EquipVo = /** @class */ (function () {
                    function EquipVo() {
                        /**tips */
                        this.tips = {};
                    }
                    EquipVo.prototype.fromByteArray = function (bytes) {
                    };
                    return EquipVo;
                }());
                models.EquipVo = EquipVo;
            })(models = strengThening.models || (strengThening.models = {}));
        })(strengThening = modules.strengThening || (modules.strengThening = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=EquipVo.js.map