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
                var SCreateTeamVo = /** @class */ (function () {
                    function SCreateTeamVo() {
                    }
                    SCreateTeamVo.prototype.fromByteArray = function (bytes) {
                        this.teamid = bytes.readLong();
                        this.formation = bytes.readUint32();
                        this.teamstate = bytes.readUint32();
                        this.smapId = bytes.readUint32();
                    };
                    return SCreateTeamVo;
                }());
                models.SCreateTeamVo = SCreateTeamVo;
            })(models = team.models || (team.models = {}));
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SCreateTeamVo.js.map