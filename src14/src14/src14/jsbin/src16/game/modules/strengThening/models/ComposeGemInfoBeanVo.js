/**
* 合成宝石
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var strengThening;
        (function (strengThening) {
            var models;
            (function (models) {
                var ComposeGemInfoBeanVo = /** @class */ (function () {
                    function ComposeGemInfoBeanVo() {
                    }
                    ComposeGemInfoBeanVo.prototype.fromByteArray = function (bytes) {
                        this.itemIdOrGoodId = bytes.readUint32();
                        this.num = bytes.readUint32();
                    };
                    return ComposeGemInfoBeanVo;
                }());
                models.ComposeGemInfoBeanVo = ComposeGemInfoBeanVo;
            })(models = strengThening.models || (strengThening.models = {}));
        })(strengThening = modules.strengThening || (modules.strengThening = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ComposeGemInfoBeanVo.js.map