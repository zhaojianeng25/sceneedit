/**
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var team;
        (function (team) {
            var models;
            (function (models) {
                var RequestTeamMatchVo = /** @class */ (function () {
                    function RequestTeamMatchVo() {
                    }
                    RequestTeamMatchVo.prototype.fromByteArray = function (bytes) {
                        this.typematch = bytes.readUint32();
                        this.targetid = bytes.readUint32();
                        this.levelmin = bytes.readUint32();
                        this.levelmax = bytes.readUint32();
                    };
                    return RequestTeamMatchVo;
                }());
                models.RequestTeamMatchVo = RequestTeamMatchVo;
            })(models = team.models || (team.models = {}));
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RequestTeamMatchVo.js.map