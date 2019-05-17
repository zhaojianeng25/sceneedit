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
                var TeamInfoBasicWithMembersVo = /** @class */ (function () {
                    function TeamInfoBasicWithMembersVo() {
                        this.TeamMemberSimpleVo = []; //队伍数据结构带成员数据
                    }
                    TeamInfoBasicWithMembersVo.prototype.fromByteArray = function (bytes) {
                        this.TeamInfoBasicVo = new models.TeamInfoBasicVo();
                        this.TeamInfoBasicVo.fromByteArray(bytes);
                        var teamMemberSimpleSize = bytes.readUint8();
                        // let TeamMemberSimpleArray :Array<any> = [];
                        for (var teamMemberSimpleIndex = 0; teamMemberSimpleIndex < teamMemberSimpleSize; teamMemberSimpleIndex++) {
                            var teamMemberSimpleVo = new models.TeamMemberSimpleVo();
                            teamMemberSimpleVo.fromByteArray(bytes);
                            this.TeamMemberSimpleVo.push(teamMemberSimpleVo);
                        }
                        this.status = bytes.readInt32();
                    };
                    return TeamInfoBasicWithMembersVo;
                }());
                models.TeamInfoBasicWithMembersVo = TeamInfoBasicWithMembersVo;
            })(models = team.models || (team.models = {}));
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TeamInfoBasicWithMembersVo.js.map