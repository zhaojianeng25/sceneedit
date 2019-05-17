/**
* pvp3证道战个人排行榜信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var xianhui;
        (function (xianhui) {
            var models;
            (function (models) {
                var PvP3RoleSingleScoreVo = /** @class */ (function () {
                    function PvP3RoleSingleScoreVo() {
                    }
                    PvP3RoleSingleScoreVo.prototype.fromByteArray = function (bytes) {
                        this.roleId = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.score = bytes.readInt32();
                    };
                    return PvP3RoleSingleScoreVo;
                }());
                models.PvP3RoleSingleScoreVo = PvP3RoleSingleScoreVo;
            })(models = xianhui.models || (xianhui.models = {}));
        })(xianhui = modules.xianhui || (modules.xianhui = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PvP3RoleSingleScoreVo.js.map