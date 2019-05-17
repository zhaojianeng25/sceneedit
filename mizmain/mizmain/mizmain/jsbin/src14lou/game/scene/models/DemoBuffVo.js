/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var models;
        (function (models) {
            var DemoBuffVo = /** @class */ (function () {
                function DemoBuffVo() {
                }
                DemoBuffVo.prototype.fromByteArray = function (bytes) {
                    this.fighterid = bytes.readInt32();
                    this.buffid = bytes.readInt32();
                    this.round = bytes.readInt32();
                };
                return DemoBuffVo;
            }());
            models.DemoBuffVo = DemoBuffVo;
        })(models = scene.models || (scene.models = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=DemoBuffVo.js.map