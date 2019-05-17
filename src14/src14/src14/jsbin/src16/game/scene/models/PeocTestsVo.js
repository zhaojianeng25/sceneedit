/**
* 宠物数据
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var models;
        (function (models) {
            var PeocTestsVo = /** @class */ (function () {
                function PeocTestsVo() {
                }
                PeocTestsVo.prototype.fromByteArray = function (bytes) {
                    this.showpetid = bytes.readInt32();
                    this.showpetname = ByteArrayUtils.readUtf16String(bytes);
                    this.petcoloursndsize = bytes.readInt16();
                    this.showskilleffect = bytes.readByte();
                    this.evolvelevel = bytes.readByte();
                };
                return PeocTestsVo;
            }());
            models.PeocTestsVo = PeocTestsVo;
        })(models = scene.models || (scene.models = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=PeocTestsVo.js.map