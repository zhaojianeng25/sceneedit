var game;
(function (game) {
    var modules;
    (function (modules) {
        var ranKingList;
        (function (ranKingList) {
            var models;
            (function (models) {
                /**  公会战历史排名榜的Vo */
                var ClanFightHistroyRank_infoVo = /** @class */ (function () {
                    function ClanFightHistroyRank_infoVo() {
                    }
                    ClanFightHistroyRank_infoVo.prototype.fromByteArray = function (bytes) {
                        this.rank = bytes.readInt32();
                        this.clanid = bytes.readLong();
                        this.clanname = ByteArrayUtils.readUtf16String(bytes);
                        this.clanlevel = bytes.readInt32();
                        this.fightcount = bytes.readInt32();
                        this.wincount = bytes.readInt32();
                        this.scroe = bytes.readInt32();
                    };
                    return ClanFightHistroyRank_infoVo;
                }());
                models.ClanFightHistroyRank_infoVo = ClanFightHistroyRank_infoVo;
            })(models = ranKingList.models || (ranKingList.models = {}));
        })(ranKingList = modules.ranKingList || (modules.ranKingList = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ClanFightHistroyRank_infoVo.js.map