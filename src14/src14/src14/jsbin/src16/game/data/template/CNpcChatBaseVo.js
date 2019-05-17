//CNpcChatBaseVo
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CNpcChatBaseVo = /** @class */ (function () {
                function CNpcChatBaseVo() {
                }
                CNpcChatBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.chat = data.getUTFBytes(data.getUint32());
                };
                return CNpcChatBaseVo;
            }());
            template.CNpcChatBaseVo = CNpcChatBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CNpcChatBaseVo.js.map