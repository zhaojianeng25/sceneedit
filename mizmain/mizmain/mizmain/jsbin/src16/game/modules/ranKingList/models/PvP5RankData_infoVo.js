var game;
(function (game) {
    var modules;
    (function (modules) {
        var ranKingList;
        (function (ranKingList) {
            var models;
            (function (models) {
                /** 5v5竞技场排行榜的Vo */
                var PvP5RankData_infoVo = /** @class */ (function () {
                    function PvP5RankData_infoVo() {
                    }
                    PvP5RankData_infoVo.prototype.fromByteArray = function (bytes) {
                        this.rank = bytes.readInt32();
                        this.roleid = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.score = bytes.readInt32();
                        this.school = bytes.readInt32();
                    };
                    return PvP5RankData_infoVo;
                }());
                models.PvP5RankData_infoVo = PvP5RankData_infoVo;
            })(models = ranKingList.models || (ranKingList.models = {}));
        })(ranKingList = modules.ranKingList || (modules.ranKingList = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PvP5RankData_infoVo.js.map