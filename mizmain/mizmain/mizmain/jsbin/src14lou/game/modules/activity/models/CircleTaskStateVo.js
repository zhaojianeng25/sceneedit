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
                var CircleTaskStateVo = /** @class */ (function () {
                    function CircleTaskStateVo() {
                    }
                    CircleTaskStateVo.prototype.fromByteArray = function (bytes) {
                        this.questid = bytes.readUint32();
                        this.state = bytes.readUint32();
                    };
                    return CircleTaskStateVo;
                }());
                models.CircleTaskStateVo = CircleTaskStateVo;
            })(models = activity.models || (activity.models = {}));
        })(activity = modules.activity || (modules.activity = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=CircleTaskStateVo.js.map