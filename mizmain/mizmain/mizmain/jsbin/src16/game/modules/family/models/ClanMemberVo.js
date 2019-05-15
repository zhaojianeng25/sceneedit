var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var models;
            (function (models) {
                /** 公会成员数据Vo */
                var ClanMemberVo = /** @class */ (function () {
                    function ClanMemberVo() {
                    }
                    ClanMemberVo.prototype.fromByteArray = function (bytes) {
                        this.roleid = bytes.readLong();
                        this.shapeid = bytes.readInt32();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.rolelevel = bytes.readInt16();
                        this.rolecontribution = bytes.readInt32();
                        this.weekcontribution = bytes.readInt32();
                        this.historycontribution = bytes.readInt32();
                        this.rolefreezedcontribution = bytes.readInt32();
                        this.preweekcontribution = bytes.readInt32();
                        this.lastonlinetime = bytes.readInt32();
                        this.position = bytes.readInt8();
                        this.school = bytes.readInt8();
                        this.jointime = bytes.readInt32();
                        this.weekaid = bytes.readInt16();
                        this.historyaid = bytes.readInt32();
                        this.isbannedtalk = bytes.readInt8();
                        this.fightvalue = bytes.readInt32();
                        this.claninstnum = bytes.readInt16();
                        this.clanfightnum = bytes.readInt16();
                    };
                    return ClanMemberVo;
                }());
                models.ClanMemberVo = ClanMemberVo;
            })(models = family.models || (family.models = {}));
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ClanMemberVo.js.map