/**
* 通知匹配结果
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var xianhui;
        (function (xianhui) {
            var models;
            (function (models) {
                var PvP3RoleSingleMatchVo = /** @class */ (function () {
                    function PvP3RoleSingleMatchVo() {
                    }
                    PvP3RoleSingleMatchVo.prototype.fromByteArray = function (bytes) {
                        this.roleId = bytes.readLong();
                        this.level = bytes.readInt16();
                        this.shape = bytes.readInt32();
                        this.school = bytes.readInt32();
                    };
                    return PvP3RoleSingleMatchVo;
                }());
                models.PvP3RoleSingleMatchVo = PvP3RoleSingleMatchVo;
            })(models = xianhui.models || (xianhui.models = {}));
        })(xianhui = modules.xianhui || (modules.xianhui = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PvP3RoleSingleMatchVo.js.map