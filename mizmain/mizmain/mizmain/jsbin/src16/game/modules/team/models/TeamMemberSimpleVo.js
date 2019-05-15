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
                var TeamMemberSimpleVo = /** @class */ (function () {
                    function TeamMemberSimpleVo() {
                    }
                    TeamMemberSimpleVo.prototype.fromByteArray = function (bytes) {
                        this.roleid = ByteArrayUtils.readLong(bytes);
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.level = bytes.readInt32();
                        this.school = bytes.readInt32();
                        this.shape = bytes.readInt32();
                    };
                    return TeamMemberSimpleVo;
                }());
                models.TeamMemberSimpleVo = TeamMemberSimpleVo;
            })(models = team.models || (team.models = {}));
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TeamMemberSimpleVo.js.map