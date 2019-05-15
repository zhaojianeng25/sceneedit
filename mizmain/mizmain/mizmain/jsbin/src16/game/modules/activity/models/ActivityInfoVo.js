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
                var ActivityInfoVo = /** @class */ (function () {
                    function ActivityInfoVo() {
                    }
                    ActivityInfoVo.prototype.fromByteArray = function (bytes) {
                        this.activityId = bytes.readUint32();
                        this.state = bytes.readUint32();
                        this.activitystate = bytes.readUint32();
                        this.finishtimes = bytes.readUint32();
                        this.nextid = bytes.readUint32();
                        this.nextnextid = bytes.readUint32();
                    };
                    return ActivityInfoVo;
                }());
                models.ActivityInfoVo = ActivityInfoVo;
            })(models = activity.models || (activity.models = {}));
        })(activity = modules.activity || (modules.activity = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ActivityInfoVo.js.map