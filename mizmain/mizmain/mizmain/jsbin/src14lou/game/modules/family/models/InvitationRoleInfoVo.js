/**
* 公会邀请
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var models;
            (function (models) {
                var InvitationRoleInfoVo = /** @class */ (function () {
                    function InvitationRoleInfoVo() {
                        /**角色换装信息key值参考SpriteComponents的枚举，value为0代表脱下某件换装 */
                        this.components = new Dictionary();
                    }
                    InvitationRoleInfoVo.prototype.fromByteArray = function (bytes) {
                        this.roleid = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.shape = bytes.readInt32();
                        this.level = bytes.readInt32();
                        this.sex = bytes.readInt32();
                        this.school = bytes.readInt32();
                        this.fightvalue = bytes.readInt32();
                        this.vip = bytes.readInt32();
                        var size = bytes.readInt8();
                        for (var i = 0; i < size; i++) {
                            this.components.set(bytes.readByte(), bytes.readInt32());
                        }
                    };
                    return InvitationRoleInfoVo;
                }());
                models.InvitationRoleInfoVo = InvitationRoleInfoVo;
            })(models = family.models || (family.models = {}));
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=InvitationRoleInfoVo.js.map