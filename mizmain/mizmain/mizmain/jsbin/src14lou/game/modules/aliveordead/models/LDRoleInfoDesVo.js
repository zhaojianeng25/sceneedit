var game;
(function (game) {
    var modules;
    (function (modules) {
        var aliveordead;
        (function (aliveordead) {
            var models;
            (function (models) {
                /** 战仙会（生死斗）个人详情 */
                var LDRoleInfoDesVo = /** @class */ (function () {
                    function LDRoleInfoDesVo() {
                    }
                    LDRoleInfoDesVo.prototype.fromByteArray = function (bytes) {
                        this.roleid = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.shape = bytes.readInt32();
                        this.level = bytes.readInt32();
                        this.school = bytes.readInt32();
                        this.teamnum = bytes.readInt32();
                        this.teamnummax = bytes.readInt32();
                    };
                    return LDRoleInfoDesVo;
                }());
                models.LDRoleInfoDesVo = LDRoleInfoDesVo;
            })(models = aliveordead.models || (aliveordead.models = {}));
        })(aliveordead = modules.aliveordead || (modules.aliveordead = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=LDRoleInfoDesVo.js.map