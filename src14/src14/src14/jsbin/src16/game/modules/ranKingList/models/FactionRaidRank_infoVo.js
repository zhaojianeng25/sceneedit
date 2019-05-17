var game;
(function (game) {
    var modules;
    (function (modules) {
        var ranKingList;
        (function (ranKingList) {
            var models;
            (function (models) {
                /**
             * name  公会副本竞速榜的Vo
             * 公会就是帮派
             * 熔火之心、纳克萨玛斯都是公会副本
             */
                var FactionRaidRank_infoVo = /** @class */ (function () {
                    function FactionRaidRank_infoVo() {
                    }
                    FactionRaidRank_infoVo.prototype.fromByteArray = function (bytes) {
                    };
                    return FactionRaidRank_infoVo;
                }());
                models.FactionRaidRank_infoVo = FactionRaidRank_infoVo;
            })(models = ranKingList.models || (ranKingList.models = {}));
        })(ranKingList = modules.ranKingList || (modules.ranKingList = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FactionRaidRank_infoVo.js.map