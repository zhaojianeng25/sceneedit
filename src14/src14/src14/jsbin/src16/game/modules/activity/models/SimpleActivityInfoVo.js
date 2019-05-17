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
                var SimpleActivityInfoVo = /** @class */ (function () {
                    function SimpleActivityInfoVo() {
                    }
                    SimpleActivityInfoVo.prototype.fromByteArray = function (bytes) {
                        this.num = bytes.readUint32();
                        this.num2 = bytes.readUint32();
                        this.activevalue = bytes.readUint32();
                    };
                    return SimpleActivityInfoVo;
                }());
                models.SimpleActivityInfoVo = SimpleActivityInfoVo;
            })(models = activity.models || (activity.models = {}));
        })(activity = modules.activity || (modules.activity = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SimpleActivityInfoVo.js.map