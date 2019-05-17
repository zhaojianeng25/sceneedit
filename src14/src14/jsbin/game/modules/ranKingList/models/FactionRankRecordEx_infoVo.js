var game;
(function (game) {
    var modules;
    (function (modules) {
        var ranKingList;
        (function (ranKingList) {
            var models;
            (function (models) {
                /** 公会榜的Vo * 公会就是帮派 */
                var FactionRankRecordEx_infoVo = /** @class */ (function () {
                    function FactionRankRecordEx_infoVo() {
                    }
                    FactionRankRecordEx_infoVo.prototype.fromByteArray = function (bytes) {
                        this.rank = bytes.readInt32();
                        this.factionid = bytes.readLong();
                        this.factionname = ByteArrayUtils.readUtf16String(bytes);
                        this.progressstime = bytes.readLong();
                        this.progresss = bytes.readInt32();
                        this.factionlevel = bytes.readInt32();
                        this.externdata = bytes.readInt32();
                        this.hotellevel = bytes.readInt32();
                    };
                    return FactionRankRecordEx_infoVo;
                }());
                models.FactionRankRecordEx_infoVo = FactionRankRecordEx_infoVo;
            })(models = ranKingList.models || (ranKingList.models = {}));
        })(ranKingList = modules.ranKingList || (modules.ranKingList = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FactionRankRecordEx_infoVo.js.map