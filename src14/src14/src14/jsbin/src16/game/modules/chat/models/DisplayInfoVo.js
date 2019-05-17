/**
* 聊天信息插入附加属性(道具、宠物、技能)
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var chat;
        (function (chat) {
            var models;
            (function (models) {
                var DisplayInfoVo = /** @class */ (function () {
                    function DisplayInfoVo() {
                    }
                    DisplayInfoVo.prototype.fromByteArray = function (bytes) {
                        this.displaytype = bytes.readInt32();
                        this.roleid = ByteArrayUtils.readLong(bytes);
                        this.shopid = ByteArrayUtils.readLong(bytes);
                        this.counterid = bytes.readInt32();
                        this.uniqid = bytes.readInt32();
                        this.teamid = ByteArrayUtils.readLong(bytes);
                        this.crosstt = ByteArrayUtils.readLong(bytes);
                        this.serverid = ByteArrayUtils.readLong(bytes);
                    };
                    return DisplayInfoVo;
                }());
                models.DisplayInfoVo = DisplayInfoVo;
            })(models = chat.models || (chat.models = {}));
        })(chat = modules.chat || (modules.chat = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=DisplayInfoVo.js.map