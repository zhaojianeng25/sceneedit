var game;
(function (game) {
    var modules;
    (function (modules) {
        var ranKingList;
        (function (ranKingList) {
            var models;
            (function (models) {
                /** 红包榜的Vo */
                var RedPackRankRecord_infoVo = /** @class */ (function () {
                    function RedPackRankRecord_infoVo() {
                    }
                    RedPackRankRecord_infoVo.prototype.fromByteArray = function (bytes) {
                        this.rank = bytes.readInt32();
                        this.roleid = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.school = bytes.readInt32();
                        this.num = bytes.readLong();
                    };
                    return RedPackRankRecord_infoVo;
                }());
                models.RedPackRankRecord_infoVo = RedPackRankRecord_infoVo;
            })(models = ranKingList.models || (ranKingList.models = {}));
        })(ranKingList = modules.ranKingList || (modules.ranKingList = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RedPackRankRecord_infoVo.js.map