var game;
(function (game) {
    var modules;
    (function (modules) {
        var ranKingList;
        (function (ranKingList) {
            var models;
            (function (models) {
                /** 公会战竞技赛榜的Vo */
                var ClanFightRaceRank_infoVo = /** @class */ (function () {
                    function ClanFightRaceRank_infoVo() {
                    }
                    ClanFightRaceRank_infoVo.prototype.fromByteArray = function (bytes) {
                        this.rank = bytes.readInt32();
                        this.clanid = bytes.readLong();
                        this.clanname = ByteArrayUtils.readUtf16String(bytes);
                        this.clanlevel = bytes.readInt32();
                        this.fightcount = bytes.readInt32();
                        this.wincount = bytes.readInt32();
                        this.scroe = bytes.readInt32();
                    };
                    return ClanFightRaceRank_infoVo;
                }());
                models.ClanFightRaceRank_infoVo = ClanFightRaceRank_infoVo;
            })(models = ranKingList.models || (ranKingList.models = {}));
        })(ranKingList = modules.ranKingList || (modules.ranKingList = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ClanFightRaceRank_infoVo.js.map