/**
* d基础信息封装
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var friend;
        (function (friend) {
            var models;
            (function (models) {
                var InfoBeanVo = /** @class */ (function () {
                    function InfoBeanVo() {
                    }
                    InfoBeanVo.prototype.fromByteArray = function (bytes) {
                        this.roleId = bytes.readLong();
                        this.name = ByteArrayUtils.readUtf16String(bytes);
                        this.roleLevel = bytes.readShort();
                        this.school = bytes.readUint8();
                        this.online = bytes.readUint8();
                        this.shape = bytes.readInt32();
                        this.camp = bytes.readUint8();
                        this.relation = bytes.readShort();
                        this.factionid = bytes.readLong();
                        this.factionname = ByteArrayUtils.readUtf16String(bytes);
                    };
                    return InfoBeanVo;
                }());
                models.InfoBeanVo = InfoBeanVo;
            })(models = friend.models || (friend.models = {}));
        })(friend = modules.friend || (modules.friend = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=InfoBeanVo.js.map