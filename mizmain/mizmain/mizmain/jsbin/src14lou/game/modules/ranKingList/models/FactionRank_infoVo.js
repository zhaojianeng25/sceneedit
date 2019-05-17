var game;
(function (game) {
    var modules;
    (function (modules) {
        var ranKingList;
        (function (ranKingList) {
            var models;
            (function (models) {
                /** FactionRankRecord的Vo */
                var FactionRank_infoVo = /** @class */ (function () {
                    function FactionRank_infoVo() {
                    }
                    FactionRank_infoVo.prototype.fromByteArray = function (bytes) {
                        this.rank = bytes.readInt32();
                        this.factionname = ByteArrayUtils.readUtf16String(bytes);
                        this.mastername = ByteArrayUtils.readUtf16String(bytes);
                        this.level = bytes.readInt32();
                        this.camp = bytes.readInt32();
                        this.factionKey = bytes.readLong();
                    };
                    return FactionRank_infoVo;
                }());
                models.FactionRank_infoVo = FactionRank_infoVo;
            })(models = ranKingList.models || (ranKingList.models = {}));
        })(ranKingList = modules.ranKingList || (modules.ranKingList = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FactionRank_infoVo.js.map