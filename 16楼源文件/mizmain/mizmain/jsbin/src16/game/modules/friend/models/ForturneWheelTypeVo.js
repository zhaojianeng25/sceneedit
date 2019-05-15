/**
* 幸运大转盘奖励类型
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var friend;
        (function (friend) {
            var models;
            (function (models) {
                var ForturneWheelTypeVo = /** @class */ (function () {
                    function ForturneWheelTypeVo() {
                    }
                    ForturneWheelTypeVo.prototype.fromByteArray = function (bytes) {
                        this.itemtype = bytes.readInt32();
                        this.id = bytes.readInt32();
                        this.num = bytes.readLong();
                        this.times = bytes.readInt32();
                    };
                    return ForturneWheelTypeVo;
                }());
                models.ForturneWheelTypeVo = ForturneWheelTypeVo;
            })(models = friend.models || (friend.models = {}));
        })(friend = modules.friend || (modules.friend = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ForturneWheelTypeVo.js.map