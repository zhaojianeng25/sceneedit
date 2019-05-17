/**
* 申请入帮人物基本信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var models;
            (function (models) {
                var RoleBaseInfoVo = /** @class */ (function () {
                    function RoleBaseInfoVo() {
                    }
                    RoleBaseInfoVo.prototype.fromByteArray = function (bytes) {
                        this.roleid = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.rolelevel = bytes.readInt32();
                        this.roleschool = bytes.readInt32();
                        this.applytime = bytes.readLong();
                        this.fightvalue = bytes.readInt32();
                    };
                    return RoleBaseInfoVo;
                }());
                models.RoleBaseInfoVo = RoleBaseInfoVo;
            })(models = family.models || (family.models = {}));
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleBaseInfoVo.js.map