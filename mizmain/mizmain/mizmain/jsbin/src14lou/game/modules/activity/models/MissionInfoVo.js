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
            })(models = activity.models || (activity.models = {}));
        })(activity = modules.activity || (modules.activity = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=MissionInfoVo.js.map