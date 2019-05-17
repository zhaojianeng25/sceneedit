/**
* 食物
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var strengThening;
        (function (strengThening) {
            var models;
            (function (models) {
                var FoodVo = /** @class */ (function () {
                    function FoodVo() {
                    }
                    FoodVo.prototype.fromByteArray = function (bytes) {
                        var head = ByteArrayUtils.uncompact_uint32(bytes);
                        this.quality = bytes.readInt32();
                    };
                    return FoodVo;
                }());
                models.FoodVo = FoodVo;
            })(models = strengThening.models || (strengThening.models = {}));
        })(strengThening = modules.strengThening || (modules.strengThening = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FoodVo.js.map