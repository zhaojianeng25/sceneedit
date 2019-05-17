var game;
(function (game) {
    var modules;
    (function (modules) {
        var ranKingList;
        (function (ranKingList) {
            var models;
            (function (models) {
                /** 等级排行榜的Vo */
                var LevelRank_infoVo = /** @class */ (function () {
                    function LevelRank_infoVo() {
                    }
                    LevelRank_infoVo.prototype.fromByteArray = function (bytes) {
                        this.roleid = bytes.readLong();
                        this.nickname = ByteArrayUtils.readUtf16String(bytes);
                        this.level = bytes.readInt32();
                        this.school = bytes.readInt32();
                        this.rank = bytes.readInt32();
                    };
                    return LevelRank_infoVo;
                }());
                models.LevelRank_infoVo = LevelRank_infoVo;
            })(models = ranKingList.models || (ranKingList.models = {}));
        })(ranKingList = modules.ranKingList || (modules.ranKingList = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=LevelRank_infoVo.js.map