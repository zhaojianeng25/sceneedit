/**
* 装备耐久度
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var strengThening;
        (function (strengThening) {
            var models;
            (function (models) {
                var EquipNaiJiuVo = /** @class */ (function () {
                    function EquipNaiJiuVo() {
                    }
                    EquipNaiJiuVo.prototype.fromByteArray = function (bytes) {
                        this.keyinpack = bytes.readUint32();
                        this.endure = bytes.readUint32();
                    };
                    return EquipNaiJiuVo;
                }());
                models.EquipNaiJiuVo = EquipNaiJiuVo;
            })(models = strengThening.models || (strengThening.models = {}));
        })(strengThening = modules.strengThening || (modules.strengThening = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=EquipNaiJiuVo.js.map