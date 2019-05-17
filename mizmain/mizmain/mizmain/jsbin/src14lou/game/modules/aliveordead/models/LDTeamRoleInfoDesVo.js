var game;
(function (game) {
    var modules;
    (function (modules) {
        var aliveordead;
        (function (aliveordead) {
            var models;
            (function (models) {
                /** 战仙会（生死斗）队员详情 */
                var LDTeamRoleInfoDesVo = /** @class */ (function () {
                    function LDTeamRoleInfoDesVo() {
                    }
                    LDTeamRoleInfoDesVo.prototype.fromByteArray = function (bytes) {
                        this.roleid = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.shape = bytes.readInt32();
                        this.level = bytes.readInt32();
                        this.school = bytes.readInt32();
                    };
                    return LDTeamRoleInfoDesVo;
                }());
                models.LDTeamRoleInfoDesVo = LDTeamRoleInfoDesVo;
            })(models = aliveordead.models || (aliveordead.models = {}));
        })(aliveordead = modules.aliveordead || (modules.aliveordead = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=LDTeamRoleInfoDesVo.js.map