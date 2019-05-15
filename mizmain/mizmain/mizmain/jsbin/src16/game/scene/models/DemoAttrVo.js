/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var models;
        (function (models) {
            var DemoAttrVo = /** @class */ (function () {
                function DemoAttrVo() {
                }
                DemoAttrVo.prototype.fromByteArray = function (bytes) {
                    this.fighterid = bytes.readInt32();
                    this.attrid = bytes.readInt32();
                    this.value = bytes.readInt32();
                };
                return DemoAttrVo;
            }());
            models.DemoAttrVo = DemoAttrVo;
        })(models = scene.models || (scene.models = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=DemoAttrVo.js.map