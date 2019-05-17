/**
* 好友信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var friend;
        (function (friend) {
            var models;
            (function (models) {
                var FriendInfoVo = /** @class */ (function () {
                    function FriendInfoVo() {
                    }
                    FriendInfoVo.prototype.fromByteArray = function (bytes) {
                        this.FriendInfoBean = new models.InfoBeanVo();
                        this.FriendInfoBean.fromByteArray(bytes);
                        this.friendLevel = bytes.readInt32();
                    };
                    return FriendInfoVo;
                }());
                models.FriendInfoVo = FriendInfoVo;
            })(models = friend.models || (friend.models = {}));
        })(friend = modules.friend || (modules.friend = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FriendInfoVo.js.map