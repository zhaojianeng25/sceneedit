/**
*  玩家红包tipVO
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var redPacket;
        (function (redPacket) {
            var models;
            (function (models) {
                var RedPackRoleTipVo = /** @class */ (function () {
                    function RedPackRoleTipVo() {
                    }
                    RedPackRoleTipVo.prototype.fromByteArray = function (bytes) {
                        this.modeltype = bytes.readInt32();
                        bytes.readUint8();
                        this.redpackid = ByteArrayUtils.readUtf16String(bytes);
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.fushi = bytes.readInt32();
                    };
                    return RedPackRoleTipVo;
                }());
                models.RedPackRoleTipVo = RedPackRoleTipVo;
            })(models = redPacket.models || (redPacket.models = {}));
        })(redPacket = modules.redPacket || (modules.redPacket = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RedPackRoleTipVo.js.map