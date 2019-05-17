/**
* pvp3证道战排行榜信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var xianhui;
        (function (xianhui) {
            var models;
            (function (models) {
                var PvP3RoleSingleScoreMidVo = /** @class */ (function () {
                    function PvP3RoleSingleScoreMidVo() {
                    }
                    PvP3RoleSingleScoreMidVo.prototype.fromByteArray = function (bytes) {
                        this.index = bytes.readInt16();
                        this.roleId = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.score = bytes.readInt32();
                    };
                    return PvP3RoleSingleScoreMidVo;
                }());
                models.PvP3RoleSingleScoreMidVo = PvP3RoleSingleScoreMidVo;
            })(models = xianhui.models || (xianhui.models = {}));
        })(xianhui = modules.xianhui || (modules.xianhui = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PvP3RoleSingleScoreMidVo.js.map