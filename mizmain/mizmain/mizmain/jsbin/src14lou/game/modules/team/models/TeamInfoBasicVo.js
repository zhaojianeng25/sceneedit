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
                var TeamInfoBasicVo = /** @class */ (function () {
                    function TeamInfoBasicVo() {
                    }
                    TeamInfoBasicVo.prototype.fromByteArray = function (bytes) {
                        this.teamid = ByteArrayUtils.readLong(bytes);
                        this.leaderid = ByteArrayUtils.readLong(bytes);
                        this.minlevel = bytes.readUint32();
                        this.maxlevel = bytes.readUint32();
                        this.leadername = ByteArrayUtils.readUtf16String(bytes);
                        this.leaderlevel = bytes.readUint32();
                        var leaderschool = bytes.readUint32();
                        this.membernum = bytes.readUint32();
                        this.membermaxnum = bytes.readUint32();
                        this.targetid = bytes.readUint32();
                    };
                    return TeamInfoBasicVo;
                }());
                models.TeamInfoBasicVo = TeamInfoBasicVo;
            })(models = team.models || (team.models = {}));
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TeamInfoBasicVo.js.map