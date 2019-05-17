/**
* 聊天通用消息数据结构by LJM
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var chat;
        (function (chat) {
            var models;
            (function (models) {
                var ChatMessageVo = /** @class */ (function () {
                    function ChatMessageVo() {
                    }
                    return ChatMessageVo;
                }());
                models.ChatMessageVo = ChatMessageVo;
            })(models = chat.models || (chat.models = {}));
        })(chat = modules.chat || (modules.chat = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ChatMessageVo.js.map