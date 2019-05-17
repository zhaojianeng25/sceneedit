/**
* 离线消息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var friend;
        (function (friend) {
            var models;
            (function (models) {
                var offLineMsgBeanVo = /** @class */ (function () {
                    function offLineMsgBeanVo() {
                    }
                    offLineMsgBeanVo.prototype.fromByteArray = function (bytes) {
                        this.strangerMessage = new models.StrangerMessageBeanVo();
                        this.strangerMessage.fromByteArray(bytes);
                        this.time = ByteArrayUtils.readUtf16String(bytes);
                        ;
                    };
                    return offLineMsgBeanVo;
                }());
                models.offLineMsgBeanVo = offLineMsgBeanVo;
            })(models = friend.models || (friend.models = {}));
        })(friend = modules.friend || (modules.friend = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=offLineMsgBeanVo.js.map