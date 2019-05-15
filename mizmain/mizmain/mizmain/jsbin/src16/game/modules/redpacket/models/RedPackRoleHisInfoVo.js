/**
* 被领取红包里领取记录信息的Vo
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var redPacket;
        (function (redPacket) {
            var models;
            (function (models) {
                var RedPackRoleHisInfoVo = /** @class */ (function () {
                    function RedPackRoleHisInfoVo() {
                    }
                    RedPackRoleHisInfoVo.prototype.fromByteArray = function (bytes) {
                        this.roleid = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.redpackmoney = bytes.readInt32();
                    };
                    return RedPackRoleHisInfoVo;
                }());
                models.RedPackRoleHisInfoVo = RedPackRoleHisInfoVo;
            })(models = redPacket.models || (redPacket.models = {}));
        })(redPacket = modules.redPacket || (modules.redPacket = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RedPackRoleHisInfoVo.js.map