/**
*  红包记录的信息VO
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var redPacket;
        (function (redPacket) {
            var models;
            (function (models) {
                var RedPackRoleRecordVo = /** @class */ (function () {
                    function RedPackRoleRecordVo() {
                    }
                    RedPackRoleRecordVo.prototype.fromByteArray = function (bytes) {
                        this.modeltype = bytes.readInt32();
                        bytes.readUint8();
                        this.redpackid = ByteArrayUtils.readUtf16String(bytes);
                        //如果红包id没有，则返回，因为服务器那边会删除过期的红包
                        if (!this.redpackid)
                            return;
                        this.roleid = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.school = bytes.readInt32();
                        this.shape = bytes.readInt32();
                        this.redpackmoney = bytes.readInt32();
                        this.time = bytes.readLong();
                    };
                    return RedPackRoleRecordVo;
                }());
                models.RedPackRoleRecordVo = RedPackRoleRecordVo;
            })(models = redPacket.models || (redPacket.models = {}));
        })(redPacket = modules.redPacket || (modules.redPacket = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RedPackRoleRecordVo.js.map