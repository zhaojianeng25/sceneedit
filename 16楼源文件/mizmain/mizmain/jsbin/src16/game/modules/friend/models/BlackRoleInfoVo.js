/**
* 搜索的角色基础信息封装
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var friend;
        (function (friend) {
            var models;
            (function (models) {
                var BlackRoleInfoVo = /** @class */ (function () {
                    function BlackRoleInfoVo() {
                    }
                    BlackRoleInfoVo.prototype.fromByteArray = function (bytes) {
                        this.roleId = bytes.readLong();
                        this.name = ByteArrayUtils.readUtf16String(bytes);
                        this.level = bytes.readShort();
                        this.shape = bytes.readInt32();
                        this.school = bytes.readUint8();
                    };
                    return BlackRoleInfoVo;
                }());
                models.BlackRoleInfoVo = BlackRoleInfoVo;
            })(models = friend.models || (friend.models = {}));
        })(friend = modules.friend || (modules.friend = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BlackRoleInfoVo.js.map