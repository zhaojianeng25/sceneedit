/**
* MulDayLoginVo
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var reward;
        (function (reward) {
            var models;
            (function (models) {
                var MulDayLoginVo = /** @class */ (function () {
                    function MulDayLoginVo() {
                    }
                    MulDayLoginVo.prototype.fromByteArray = function (bytes) {
                        this.logindays = bytes.readInt32();
                        var mapSize = bytes.readUint8();
                        this.rewardmap = new Laya.Dictionary();
                        for (var index = 0; index < mapSize; index++) {
                            this.rewardmap.set(bytes.readUint32(), bytes.readLong());
                        }
                    };
                    return MulDayLoginVo;
                }());
                models.MulDayLoginVo = MulDayLoginVo;
            })(models = reward.models || (reward.models = {}));
        })(reward = modules.reward || (modules.reward = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=MulDayLoginVo.js.map