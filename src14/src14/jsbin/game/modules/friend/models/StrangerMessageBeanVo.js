/**
*  陌生人消息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var friend;
        (function (friend) {
            var models;
            (function (models) {
                var StrangerMessageBeanVo = /** @class */ (function () {
                    function StrangerMessageBeanVo() {
                    }
                    StrangerMessageBeanVo.prototype.fromByteArray = function (bytes) {
                        this.FriendInfoBean = new models.InfoBeanVo();
                        this.FriendInfoBean.fromByteArray(bytes);
                        this.content = ByteArrayUtils.readUtf16String(bytes);
                        this.details = new Array();
                        var detailsInfo;
                        var detailsSize = bytes.readUint8();
                        for (var index = 0; index < detailsSize; index++) {
                            detailsInfo = bytes.readUint8();
                            this.details.push(detailsInfo);
                        }
                        this.displayinfo = new Array();
                        var displayinfoSize = bytes.readUint8();
                        var displayInfo;
                        displayInfo = new game.modules.chat.models.DisplayInfoVo();
                        for (var index = 0; index < displayinfoSize; index++) {
                            displayInfo.fromByteArray(bytes);
                            this.displayinfo.push(displayInfo);
                        } //DisplayInfo
                    };
                    return StrangerMessageBeanVo;
                }());
                models.StrangerMessageBeanVo = StrangerMessageBeanVo;
            })(models = friend.models || (friend.models = {}));
        })(friend = modules.friend || (modules.friend = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=StrangerMessageBeanVo.js.map