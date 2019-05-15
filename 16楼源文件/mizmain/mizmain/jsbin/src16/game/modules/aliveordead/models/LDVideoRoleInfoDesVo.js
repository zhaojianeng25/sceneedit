var game;
(function (game) {
    var modules;
    (function (modules) {
        var aliveordead;
        (function (aliveordead) {
            var models;
            (function (models) {
                /** 战仙会（生死斗）录像视角中2位对手详情 */
                var LDVideoRoleInfoDesVo = /** @class */ (function () {
                    function LDVideoRoleInfoDesVo() {
                    }
                    LDVideoRoleInfoDesVo.prototype.fromByteArray = function (bytes) {
                        var _role1 = new models.LDRoleInfoDesVo();
                        _role1.fromByteArray(bytes);
                        this.role1 = _role1;
                        var _role2 = new models.LDRoleInfoDesVo();
                        _role2.fromByteArray(bytes);
                        this.role2 = _role2;
                        this.teamlist1 = [];
                        var _teamlist1Size = bytes.readUint8();
                        for (var i = 0; i < _teamlist1Size; i++) {
                            var _team1 = new models.LDTeamRoleInfoDesVo();
                            _team1.fromByteArray(bytes);
                            this.teamlist1.push(_team1);
                        }
                        this.teamlist2 = [];
                        var _teamlist2Size = bytes.readUint8();
                        for (var i = 0; i < _teamlist2Size; i++) {
                            var _team2 = new models.LDTeamRoleInfoDesVo();
                            _team2.fromByteArray(bytes);
                            this.teamlist2.push(_team2);
                        }
                        this.battleresult = bytes.readInt32();
                        this.rosenum = bytes.readInt32();
                        this.roseflag = bytes.readInt32();
                        this.videoid = ByteArrayUtils.readUtf16String(bytes);
                    };
                    return LDVideoRoleInfoDesVo;
                }());
                models.LDVideoRoleInfoDesVo = LDVideoRoleInfoDesVo;
            })(models = aliveordead.models || (aliveordead.models = {}));
        })(aliveordead = modules.aliveordead || (modules.aliveordead = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=LDVideoRoleInfoDesVo.js.map