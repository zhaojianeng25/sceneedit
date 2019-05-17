/**
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var chat;
        (function (chat) {
            var models;
            (function (models) {
                var NowChatVo = /** @class */ (function () {
                    /*map<int32, int32> components = 6; // 角色换装信息key值参考SpriteComponents的枚举，value为0代表脱下某件换装
                    uint64 rolecreateTime = 7; // 角色创建时间
                    uint64 forbidTime = 8; // 封停截止时间
                    uint32 forbidReason = 9; // 封停原因*/
                    function NowChatVo() {
                        this.channer = "当前";
                    }
                    return NowChatVo;
                }());
                models.NowChatVo = NowChatVo;
            })(models = chat.models || (chat.models = {}));
        })(chat = modules.chat || (modules.chat = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=NowChatVo.js.map