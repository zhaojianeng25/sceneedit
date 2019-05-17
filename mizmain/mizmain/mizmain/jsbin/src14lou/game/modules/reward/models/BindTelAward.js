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
                var BindTelAwardVo = /** @class */ (function () {
                    function BindTelAwardVo() {
                    }
                    BindTelAwardVo.prototype.fromByteArray = function (bytes) {
                        this.status = bytes.readByte();
                    };
                    return BindTelAwardVo;
                }());
                models.BindTelAwardVo = BindTelAwardVo;
            })(models = reward.models || (reward.models = {}));
        })(reward = modules.reward || (modules.reward = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BindTelAward.js.map