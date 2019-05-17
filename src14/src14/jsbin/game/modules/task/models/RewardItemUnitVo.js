/**
* 奖励列表
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var task;
        (function (task) {
            var models;
            (function (models) {
                var RewardItemUnitVo = /** @class */ (function () {
                    function RewardItemUnitVo() {
                    }
                    RewardItemUnitVo.prototype.fromByteArray = function (bytes) {
                        this.baseid = bytes.readInt32();
                        this.num = bytes.readInt32();
                    };
                    return RewardItemUnitVo;
                }());
                models.RewardItemUnitVo = RewardItemUnitVo;
            })(models = task.models || (task.models = {}));
        })(task = modules.task || (modules.task = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RewardItemUnitVo.js.map