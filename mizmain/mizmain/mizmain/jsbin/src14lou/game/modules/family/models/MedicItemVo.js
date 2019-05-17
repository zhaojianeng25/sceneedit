/**
* 打开药房信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var models;
            (function (models) {
                var MedicItemVo = /** @class */ (function () {
                    function MedicItemVo() {
                    }
                    MedicItemVo.prototype.fromByteArray = function (bytes) {
                        this.itemid = bytes.readInt32();
                        this.itemnum = bytes.readInt32();
                    };
                    return MedicItemVo;
                }());
                models.MedicItemVo = MedicItemVo;
            })(models = family.models || (family.models = {}));
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=MedicItemVo.js.map