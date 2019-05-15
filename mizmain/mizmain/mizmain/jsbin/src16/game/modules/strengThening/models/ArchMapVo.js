/**
* 藏宝图的属性
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var strengThening;
        (function (strengThening) {
            var models;
            (function (models) {
                var ArchMapVo = /** @class */ (function () {
                    function ArchMapVo() {
                    }
                    ArchMapVo.prototype.fromByteArray = function (bytes) {
                        var head = ByteArrayUtils.uncompact_uint32(bytes);
                        this.mapId = bytes.readInt32();
                        this.posX = bytes.readInt32();
                        this.posY = bytes.readInt32();
                    };
                    return ArchMapVo;
                }());
                models.ArchMapVo = ArchMapVo;
            })(models = strengThening.models || (strengThening.models = {}));
        })(strengThening = modules.strengThening || (modules.strengThening = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ArchMapVo.js.map