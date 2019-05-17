/**
* VipInfoVo
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var reward;
        (function (reward) {
            var models;
            (function (models) {
                var BindTelVo = /** @class */ (function () {
                    function BindTelVo() {
                    }
                    BindTelVo.prototype.fromByteArray = function (bytes) {
                        this.tel = bytes.readLong();
                        this.createDate = bytes.readLong();
                        this.isFistLoginOfDay = bytes.readByte();
                        this.isGetBindTelAward = bytes.readByte();
                        this.isBindTelAgain = bytes.readByte();
                        this.bindTelTime = bytes.readLong();
                    };
                    return BindTelVo;
                }());
                models.BindTelVo = BindTelVo;
            })(models = reward.models || (reward.models = {}));
        })(reward = modules.reward || (modules.reward = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BindTelVo.js.map