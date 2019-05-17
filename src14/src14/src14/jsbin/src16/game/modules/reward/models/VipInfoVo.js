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
                var VipInfoVo = /** @class */ (function () {
                    function VipInfoVo() {
                    }
                    VipInfoVo.prototype.fromByteArray = function (bytes) {
                        this.vipexp = bytes.readInt32();
                        this.viplevel = bytes.readInt32();
                        this.bounus = bytes.readInt32();
                        this.gotbounus = bytes.readInt32();
                        this.viprights = [];
                        var viprightsSize = bytes.readUint8();
                        for (var index = 0; index < viprightsSize; index++) {
                            this.viprights.push(bytes.readInt32());
                        }
                    };
                    return VipInfoVo;
                }());
                models.VipInfoVo = VipInfoVo;
            })(models = reward.models || (reward.models = {}));
        })(reward = modules.reward || (modules.reward = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=VipInfoVo.js.map