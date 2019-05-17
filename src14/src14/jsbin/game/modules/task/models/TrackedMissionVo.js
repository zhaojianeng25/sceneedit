/**
* 可接任务信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var task;
        (function (task) {
            var models;
            (function (models) {
                var TrackedMissionVo = /** @class */ (function () {
                    function TrackedMissionVo() {
                    }
                    TrackedMissionVo.prototype.fromByteArray = function (bytes) {
                        this.acceptdate = bytes.readLong();
                    };
                    return TrackedMissionVo;
                }());
                models.TrackedMissionVo = TrackedMissionVo;
            })(models = task.models || (task.models = {}));
        })(task = modules.task || (modules.task = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TrackedMissionVo.js.map