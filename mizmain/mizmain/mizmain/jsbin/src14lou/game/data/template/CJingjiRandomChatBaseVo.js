//CJingjiRandomChatBaseVo
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CJingjiRandomChatBaseVo = /** @class */ (function () {
                function CJingjiRandomChatBaseVo() {
                }
                CJingjiRandomChatBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.strchat = data.getUTFBytes(data.getUint32());
                };
                return CJingjiRandomChatBaseVo;
            }());
            template.CJingjiRandomChatBaseVo = CJingjiRandomChatBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CJingjiRandomChatBaseVo.js.map