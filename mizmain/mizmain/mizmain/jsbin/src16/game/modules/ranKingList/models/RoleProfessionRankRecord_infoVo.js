var game;
(function (game) {
    var modules;
    (function (modules) {
        var ranKingList;
        (function (ranKingList) {
            var models;
            (function (models) {
                /** 职业榜的Vo */
                var RoleProfessionRankRecord_infoVo = /** @class */ (function () {
                    function RoleProfessionRankRecord_infoVo() {
                    }
                    RoleProfessionRankRecord_infoVo.prototype.fromByteArray = function (bytes) {
                        this.rank = bytes.readInt32();
                        this.roleid = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.school = bytes.readInt32();
                        this.score = bytes.readInt32();
                        this.faction = ByteArrayUtils.readUtf16String(bytes);
                        this.rolelevel = bytes.readInt32();
                    };
                    return RoleProfessionRankRecord_infoVo;
                }());
                models.RoleProfessionRankRecord_infoVo = RoleProfessionRankRecord_infoVo;
            })(models = ranKingList.models || (ranKingList.models = {}));
        })(ranKingList = modules.ranKingList || (modules.ranKingList = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleProfessionRankRecord_infoVo.js.map