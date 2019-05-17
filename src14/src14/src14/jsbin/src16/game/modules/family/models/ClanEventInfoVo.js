/**
* 公会事件
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var models;
            (function (models) {
                var ClanEventInfoVo = /** @class */ (function () {
                    function ClanEventInfoVo() {
                    }
                    ClanEventInfoVo.prototype.fromByteArray = function (bytes) {
                        this.eventtime = ByteArrayUtils.readUtf16String(bytes);
                        this.eventinfo = ByteArrayUtils.readUtf16String(bytes);
                        this.eventtype = bytes.readInt32();
                        this.eventvalue = bytes.readLong();
                    };
                    return ClanEventInfoVo;
                }());
                models.ClanEventInfoVo = ClanEventInfoVo;
            })(models = family.models || (family.models = {}));
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ClanEventInfoVo.js.map