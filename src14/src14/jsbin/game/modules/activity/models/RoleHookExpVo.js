/**
* RoleHookExpVo
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var activity;
        (function (activity) {
            var models;
            (function (models) {
                var RoleHookExpVo = /** @class */ (function () {
                    function RoleHookExpVo() {
                    }
                    RoleHookExpVo.prototype.fromByteArray = function (bytes) {
                        this.cangetdpoint = bytes.readInt16();
                        this.getdpoint = bytes.readInt16();
                        this.offlineexp = bytes.readLong();
                    };
                    return RoleHookExpVo;
                }());
                models.RoleHookExpVo = RoleHookExpVo;
            })(models = activity.models || (activity.models = {}));
        })(activity = modules.activity || (modules.activity = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleHookExpVo.js.map