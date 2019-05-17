/**
* name 附魔
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var strengThening;
        (function (strengThening) {
            var models;
            (function (models) {
                var EnhancementVo = /** @class */ (function () {
                    function EnhancementVo() {
                    }
                    EnhancementVo.prototype.fromByteArray = function (bytes) {
                        var head = ByteArrayUtils.uncompact_uint32(bytes);
                        this.level = bytes.readInt32();
                    };
                    return EnhancementVo;
                }());
                models.EnhancementVo = EnhancementVo;
            })(models = strengThening.models || (strengThening.models = {}));
        })(strengThening = modules.strengThening || (modules.strengThening = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=EnhancementVo.js.map