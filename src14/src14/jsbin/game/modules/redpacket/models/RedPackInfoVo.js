/**
*  红包信息VO
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var redPacket;
        (function (redPacket) {
            var models;
            (function (models) {
                var RedPackInfoVo = /** @class */ (function () {
                    function RedPackInfoVo() {
                    }
                    RedPackInfoVo.prototype.fromByteArray = function (bytes) {
                        bytes.readUint8();
                        this.redpackid = ByteArrayUtils.readUtf16String(bytes);
                        this.roleid = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.redpackdes = ByteArrayUtils.readUtf16String(bytes);
                        this.redpackstate = bytes.readInt32();
                        this.fushi = bytes.readInt32();
                    };
                    return RedPackInfoVo;
                }());
                models.RedPackInfoVo = RedPackInfoVo;
            })(models = redPacket.models || (redPacket.models = {}));
        })(redPacket = modules.redPacket || (modules.redPacket = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RedPackInfoVo.js.map