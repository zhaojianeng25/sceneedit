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
                var TeamMemberBasicVo = /** @class */ (function () {
                    function TeamMemberBasicVo() {
                    }
                    TeamMemberBasicVo.prototype.fromByteArray = function (bytes) {
                        this.roleid = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.level = bytes.readInt32();
                        this.sceneid = bytes.readLong();
                        this.pos = new models.PosVo();
                        this.pos.fromByteArray(bytes);
                        this.school = bytes.readInt32();
                        this.hp = bytes.readInt32();
                        this.maxhp = bytes.readInt32();
                        this.mp = bytes.readInt32();
                        this.maxmp = bytes.readInt32();
                        var title = ByteArrayUtils.readUtf16String(bytes);
                        this.title = typeof (title) == "undefined" ? "" : title;
                        this.state = bytes.readInt32();
                        this.shape = bytes.readInt32();
                        this.hugindex = bytes.readByte();
                        var mapSize = ByteArrayUtils.uncompact_uint32(bytes);
                        this.components = new Laya.Dictionary();
                        for (var index = 0; index < mapSize; index++) {
                            this.components.set(bytes.readByte(), bytes.readInt32());
                        }
                        this.camp = bytes.readByte();
                    };
                    return TeamMemberBasicVo;
                }());
                models.TeamMemberBasicVo = TeamMemberBasicVo;
            })(models = team.models || (team.models = {}));
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TeamMemberBasicVo.js.map