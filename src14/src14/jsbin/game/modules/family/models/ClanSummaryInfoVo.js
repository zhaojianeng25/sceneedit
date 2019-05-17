/**
* 公会信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var models;
            (function (models) {
                var ClanSummaryInfoVo = /** @class */ (function () {
                    function ClanSummaryInfoVo() {
                    }
                    ClanSummaryInfoVo.prototype.fromByteArray = function (bytes) {
                        this.clanid = bytes.readLong();
                        this.index = bytes.readInt32();
                        this.clanname = ByteArrayUtils.readUtf16String(bytes);
                        this.membernum = bytes.readInt32();
                        this.clanlevel = bytes.readInt32();
                        this.clanmastername = ByteArrayUtils.readUtf16String(bytes);
                        this.clanmasterid = bytes.readLong();
                        this.oldclanname = ByteArrayUtils.readUtf16String(bytes);
                        this.hotellevel = bytes.readInt32();
                    };
                    return ClanSummaryInfoVo;
                }());
                models.ClanSummaryInfoVo = ClanSummaryInfoVo;
            })(models = family.models || (family.models = {}));
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ClanSummaryInfoVo.js.map