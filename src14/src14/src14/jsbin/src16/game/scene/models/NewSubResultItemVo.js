/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var models;
        (function (models) {
            var NewSubResultItemVo = /** @class */ (function () {
                function NewSubResultItemVo() {
                }
                NewSubResultItemVo.prototype.fromByteArray = function (bytes) {
                    this.subskillid = bytes.readInt32();
                    this.subskillstarttime = bytes.readInt32();
                    this.resultlist = [];
                    var resultlistSize = bytes.readUint8();
                    var newDemoResult;
                    for (var index = 0; index < resultlistSize; index++) {
                        newDemoResult = new models.NewDemoResultVo();
                        newDemoResult.fromByteArray(bytes);
                        this.resultlist.push(newDemoResult);
                    } //NewDemoResult
                };
                return NewSubResultItemVo;
            }());
            models.NewSubResultItemVo = NewSubResultItemVo;
        })(models = scene.models || (scene.models = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=NewSubResultItemVo.js.map