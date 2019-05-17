/**
* @Author: LinQiuWen
* @description:x循环任务/x循环任务对话配置
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CRepeatTaskChatBaseVo = /** @class */ (function () {
                function CRepeatTaskChatBaseVo() {
                }
                CRepeatTaskChatBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.strmsg = data.getUTFBytes(data.getUint32());
                };
                return CRepeatTaskChatBaseVo;
            }());
            template.CRepeatTaskChatBaseVo = CRepeatTaskChatBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CRepeatTaskChatBaseVo.js.map