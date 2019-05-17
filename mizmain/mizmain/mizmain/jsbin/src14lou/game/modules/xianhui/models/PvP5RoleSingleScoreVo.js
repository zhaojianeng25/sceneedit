/**
* pvp5证道战个人排行榜信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var xianhui;
        (function (xianhui) {
            var models;
            (function (models) {
                var PvP5RoleSingleScoreVo = /** @class */ (function () {
                    function PvP5RoleSingleScoreVo() {
                    }
                    PvP5RoleSingleScoreVo.prototype.fromByteArray = function (bytes) {
                        this.roleId = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.score = bytes.readInt32();
                        this.battlenum = bytes.readByte();
                        this.winnum = bytes.readByte();
                    };
                    return PvP5RoleSingleScoreVo;
                }());
                models.PvP5RoleSingleScoreVo = PvP5RoleSingleScoreVo;
            })(models = xianhui.models || (xianhui.models = {}));
        })(xianhui = modules.xianhui || (modules.xianhui = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PvP5RoleSingleScoreVo.js.map