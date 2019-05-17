/**
* RegDataVo
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var reward;
        (function (reward) {
            var models;
            (function (models) {
                var RegDataVo = /** @class */ (function () {
                    function RegDataVo() {
                    }
                    RegDataVo.prototype.fromByteArray = function (bytes) {
                        this.month = bytes.readUint32();
                        this.times = bytes.readUint32();
                        this.suppregtimes = bytes.readUint32();
                        this.cansuppregtimes = bytes.readUint32();
                        this.suppregdays = [];
                        var suppregdaysSize = bytes.readUint8();
                        for (var index = 0; index < suppregdaysSize; index++) {
                            this.suppregdays.push(bytes.readInt32());
                        }
                        this.rewardflag = bytes.readUint32();
                    };
                    return RegDataVo;
                }());
                models.RegDataVo = RegDataVo;
            })(models = reward.models || (reward.models = {}));
        })(reward = modules.reward || (modules.reward = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RegDataVo.js.map