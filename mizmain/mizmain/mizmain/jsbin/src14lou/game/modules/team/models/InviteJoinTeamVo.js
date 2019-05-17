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
                var InviteJoinTeamVo = /** @class */ (function () {
                    function InviteJoinTeamVo() {
                    }
                    InviteJoinTeamVo.prototype.fromByteArray = function (bytes) {
                        this.leaderroleid = bytes.readLong();
                        this.invitername = ByteArrayUtils.readUtf16String(bytes);
                        this.inviterlevel = bytes.readUint32();
                        this.op = bytes.readUint32();
                    };
                    return InviteJoinTeamVo;
                }());
                models.InviteJoinTeamVo = InviteJoinTeamVo;
            })(models = team.models || (team.models = {}));
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=InviteJoinTeamVo.js.map