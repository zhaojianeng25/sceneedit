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
                var SetTeamFormationVo = /** @class */ (function () {
                    function SetTeamFormationVo() {
                    }
                    SetTeamFormationVo.prototype.fromByteArray = function (bytes) {
                        this.formation = bytes.readInt32();
                        this.formationLevel = bytes.readInt32();
                        this.msg = bytes.readByte();
                    };
                    return SetTeamFormationVo;
                }());
                models.SetTeamFormationVo = SetTeamFormationVo;
            })(models = team.models || (team.models = {}));
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SetTeamFormationVo.js.map