/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var models;
        (function (models) {
            var AIOperationVo = /** @class */ (function () {
                function AIOperationVo() {
                }
                AIOperationVo.prototype.fromByteArray = function (bytes) {
                    this.actionSeq = bytes.readInt32();
                    this.actionMoment = bytes.readInt32();
                    this.actionFighterId = bytes.readInt32();
                    this.actionId = bytes.readInt32();
                };
                return AIOperationVo;
            }());
            models.AIOperationVo = AIOperationVo;
        })(models = scene.models || (scene.models = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=AIOperationVo.js.map