/**
* 聊天通用消息数据结构
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var chat;
        (function (chat) {
            var models;
            (function (models) {
                var ChatMessageNotifyVo = /** @class */ (function () {
                    function ChatMessageNotifyVo() {
                    }
                    ChatMessageNotifyVo.prototype.fromByteArray = function (bytes) {
                        this.messageid = bytes.readUint32();
                        this.npcbaseid = bytes.readUint32();
                        this.parameters = [];
                        var parametersSize = bytes.readUint8();
                        //对于红包某条消息进行特殊处理
                        if (this.messageid == 172012 || this.messageid == 172015 || this.messageid == 172016) {
                            for (var index = 0; index < parametersSize; index++) {
                                if (index != 2) {
                                    this.parameters.push(ByteArrayUtils.readUtf16String(bytes));
                                }
                                else {
                                    //若没读长度，则无法读取红包id
                                    bytes.readUint8();
                                    this.parameters.push(ByteArrayUtils.readUtf16String(bytes));
                                }
                            }
                        }
                        else {
                            for (var index = 0; index < parametersSize; index++) {
                                this.parameters.push(ByteArrayUtils.readUtf16String(bytes));
                            }
                        }
                    };
                    return ChatMessageNotifyVo;
                }());
                models.ChatMessageNotifyVo = ChatMessageNotifyVo;
            })(models = chat.models || (chat.models = {}));
        })(chat = modules.chat || (modules.chat = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ChatMessageNotifyVo.js.map