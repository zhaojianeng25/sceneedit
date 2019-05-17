var game;
(function (game) {
    var modules;
    (function (modules) {
        var ranKingList;
        (function (ranKingList) {
            var models;
            (function (models) {
                /** 冰封王座副本排行榜的Vo */
                var BingFengRank_infoVo = /** @class */ (function () {
                    function BingFengRank_infoVo() {
                    }
                    BingFengRank_infoVo.prototype.fromByteArray = function (bytes) {
                        this.shool = bytes.readInt32();
                        this.rank = bytes.readInt32();
                        this.roleid = bytes.readLong();
                        this.roleName = ByteArrayUtils.readUtf16String(bytes);
                        this.stage = bytes.readInt32();
                        this.times = bytes.readInt32();
                    };
                    return BingFengRank_infoVo;
                }());
                models.BingFengRank_infoVo = BingFengRank_infoVo;
            })(models = ranKingList.models || (ranKingList.models = {}));
        })(ranKingList = modules.ranKingList || (modules.ranKingList = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BingFengRank_infoVo.js.map