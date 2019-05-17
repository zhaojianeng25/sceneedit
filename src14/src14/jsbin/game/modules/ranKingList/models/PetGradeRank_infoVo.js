var game;
(function (game) {
    var modules;
    (function (modules) {
        var ranKingList;
        (function (ranKingList) {
            var models;
            (function (models) {
                /** 宠物榜的Vo */
                var PetGradeRank_infoVo = /** @class */ (function () {
                    function PetGradeRank_infoVo() {
                    }
                    PetGradeRank_infoVo.prototype.fromByteArray = function (bytes) {
                        this.roleid = bytes.readLong();
                        this.uniquePetId = bytes.readLong();
                        this.nickname = ByteArrayUtils.readUtf16String(bytes);
                        this.petname = ByteArrayUtils.readUtf16String(bytes);
                        this.petgrade = bytes.readInt32();
                        this.rank = bytes.readInt32();
                        this.colour = bytes.readInt32();
                    };
                    return PetGradeRank_infoVo;
                }());
                models.PetGradeRank_infoVo = PetGradeRank_infoVo;
            })(models = ranKingList.models || (ranKingList.models = {}));
        })(ranKingList = modules.ranKingList || (modules.ranKingList = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetGradeRank_infoVo.js.map