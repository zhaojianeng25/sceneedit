var game;
(function (game) {
    var modules;
    (function (modules) {
        var aliveordead;
        (function (aliveordead) {
            var models;
            (function (models) {
                /** 战仙会（生死斗）观战视角中2位对手详情 */
                var LDRoleInfoWatchDesVo = /** @class */ (function () {
                    function LDRoleInfoWatchDesVo() {
                    }
                    LDRoleInfoWatchDesVo.prototype.fromByteArray = function (bytes) {
                        var _role1 = new models.LDRoleInfoDesVo();
                        _role1.fromByteArray(bytes);
                        this.role1 = _role1;
                        var _role2 = new models.LDRoleInfoDesVo();
                        _role2.fromByteArray(bytes);
                        this.role2 = _role2;
                        this.battleId = bytes.readLong();
                    };
                    return LDRoleInfoWatchDesVo;
                }());
                models.LDRoleInfoWatchDesVo = LDRoleInfoWatchDesVo;
            })(models = aliveordead.models || (aliveordead.models = {}));
        })(aliveordead = modules.aliveordead || (modules.aliveordead = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=LDRoleInfoWatchDesVo.js.map