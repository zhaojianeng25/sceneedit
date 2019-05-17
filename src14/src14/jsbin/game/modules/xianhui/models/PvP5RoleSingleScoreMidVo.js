/**
* pvp5证道战排行榜信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var xianhui;
        (function (xianhui) {
            var models;
            (function (models) {
                var PvP5RoleSingleScoreMidVo = /** @class */ (function () {
                    function PvP5RoleSingleScoreMidVo() {
                    }
                    PvP5RoleSingleScoreMidVo.prototype.fromByteArray = function (bytes) {
                        this.listId = bytes.readByte();
                        this.index = bytes.readInt16();
                        this.roleId = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.score = bytes.readInt32();
                        this.battlenum = bytes.readByte();
                        this.winnum = bytes.readByte();
                    };
                    return PvP5RoleSingleScoreMidVo;
                }());
                models.PvP5RoleSingleScoreMidVo = PvP5RoleSingleScoreMidVo;
            })(models = xianhui.models || (xianhui.models = {}));
        })(xianhui = modules.xianhui || (modules.xianhui = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PvP5RoleSingleScoreMidVo.js.map