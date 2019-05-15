/**
* 符文选择的信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var models;
            (function (models) {
                var RuneRequestInfoVo = /** @class */ (function () {
                    function RuneRequestInfoVo() {
                    }
                    RuneRequestInfoVo.prototype.fromByteArray = function (bytes) {
                        this.itemid = bytes.readInt32();
                    };
                    return RuneRequestInfoVo;
                }());
                models.RuneRequestInfoVo = RuneRequestInfoVo;
            })(models = family.models || (family.models = {}));
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RuneRequestInfoVo.js.map