var game;
(function (game) {
    var modules;
    (function (modules) {
        var ranKingList;
        (function (ranKingList) {
            var models;
            (function (models) {
                /** 鲜花榜的Vo */
                var FlowerRankRecord_infoVo = /** @class */ (function () {
                    function FlowerRankRecord_infoVo() {
                    }
                    FlowerRankRecord_infoVo.prototype.fromByteArray = function (bytes) {
                        this.rank = bytes.readInt32();
                        this.roleid = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.school = bytes.readInt32();
                        this.num = bytes.readLong();
                    };
                    return FlowerRankRecord_infoVo;
                }());
                models.FlowerRankRecord_infoVo = FlowerRankRecord_infoVo;
            })(models = ranKingList.models || (ranKingList.models = {}));
        })(ranKingList = modules.ranKingList || (modules.ranKingList = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FlowerRankRecord_infoVo.js.map