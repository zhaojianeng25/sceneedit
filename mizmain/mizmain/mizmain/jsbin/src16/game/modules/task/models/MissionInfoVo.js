/**
* 任务状态信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var task;
        (function (task) {
            var models;
            (function (models) {
                var MissionInfoVo = /** @class */ (function () {
                    function MissionInfoVo() {
                    }
                    MissionInfoVo.prototype.fromByteArray = function (bytes) {
                        this.missionid = bytes.readInt32();
                        this.missionstatus = bytes.readInt32();
                        this.missionvalue = bytes.readInt32();
                        this.missionround = bytes.readInt32();
                        this.dstnpckey = bytes.readLong();
                    };
                    return MissionInfoVo;
                }());
                models.MissionInfoVo = MissionInfoVo;
            })(models = task.models || (task.models = {}));
        })(task = modules.task || (modules.task = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=MissionInfoVo.js.map