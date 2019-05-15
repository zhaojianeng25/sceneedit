var game;
(function (game) {
    var modules;
    (function (modules) {
        var ranKingList;
        (function (ranKingList) {
            var models;
            (function (models) {
                /** 人物综和实力榜的Vo */
                var RanKingList_renzong_InfoVo = /** @class */ (function () {
                    function RanKingList_renzong_InfoVo() {
                    }
                    RanKingList_renzong_InfoVo.prototype.fromByteArray = function (bytes) {
                        this.rank = bytes.readInt32();
                        this.roleid = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.school = bytes.readInt32();
                        this.score = bytes.readInt32();
                        this.rolelevel = bytes.readInt32();
                    };
                    return RanKingList_renzong_InfoVo;
                }());
                models.RanKingList_renzong_InfoVo = RanKingList_renzong_InfoVo;
            })(models = ranKingList.models || (ranKingList.models = {}));
        })(ranKingList = modules.ranKingList || (modules.ranKingList = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RanKingList_renzong_InfoVo.js.map