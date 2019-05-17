/**
* 角色申请公会状态
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var models;
            (function (models) {
                var ApplyClanVo = /** @class */ (function () {
                    function ApplyClanVo() {
                    }
                    ApplyClanVo.prototype.fromByteArray = function (bytes) {
                        this.clankey = bytes.readLong();
                        this.applystate = bytes.readInt32();
                    };
                    return ApplyClanVo;
                }());
                models.ApplyClanVo = ApplyClanVo;
            })(models = family.models || (family.models = {}));
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ApplyClanVo.js.map