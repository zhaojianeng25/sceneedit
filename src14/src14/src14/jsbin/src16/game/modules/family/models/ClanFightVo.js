/**
* 对战数据
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var models;
            (function (models) {
                var ClanFightVo = /** @class */ (function () {
                    function ClanFightVo() {
                    }
                    ClanFightVo.prototype.fromByteArray = function (bytes) {
                        this.clanid1 = bytes.readLong();
                        this.clanname1 = ByteArrayUtils.readUtf16String(bytes);
                        this.clanid2 = bytes.readLong();
                        this.clanname2 = ByteArrayUtils.readUtf16String(bytes);
                        this.winner = bytes.readInt32();
                    };
                    return ClanFightVo;
                }());
                models.ClanFightVo = ClanFightVo;
            })(models = family.models || (family.models = {}));
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ClanFightVo.js.map