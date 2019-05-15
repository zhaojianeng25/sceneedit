/**
* MonthCardVo
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var reward;
        (function (reward) {
            var models;
            (function (models) {
                var MonthCardVo = /** @class */ (function () {
                    function MonthCardVo() {
                    }
                    MonthCardVo.prototype.fromByteArray = function (bytes) {
                        this.endtime = bytes.readLong();
                        this.grab = bytes.readInt32();
                    };
                    return MonthCardVo;
                }());
                models.MonthCardVo = MonthCardVo;
            })(models = reward.models || (reward.models = {}));
        })(reward = modules.reward || (modules.reward = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=MonthCardVo.js.map