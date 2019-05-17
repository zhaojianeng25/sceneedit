/**
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var achievent;
        (function (achievent) {
            var models;
            (function (models) {
                var AchieventInfoVo = /** @class */ (function () {
                    function AchieventInfoVo() {
                    }
                    AchieventInfoVo.prototype.fromByteArray = function (bytes) {
                        this.archiveid = bytes.readInt32();
                        this.state = bytes.readInt32();
                    };
                    return AchieventInfoVo;
                }());
                models.AchieventInfoVo = AchieventInfoVo;
            })(models = achievent.models || (achievent.models = {}));
        })(achievent = modules.achievent || (modules.achievent = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=AchieventInfoVo.js.map