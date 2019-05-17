/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var models;
        (function (models) {
            var DemoExecuteVo = /** @class */ (function () {
                function DemoExecuteVo() {
                }
                DemoExecuteVo.prototype.fromByteArray = function (bytes) {
                    this.attackerID = bytes.readInt32();
                    this.hpconsume = bytes.readInt32();
                    this.mpconsume = bytes.readInt32();
                    this.spconsume = bytes.readInt32();
                    this.operationType = bytes.readInt32();
                    this.operationID = bytes.readInt32();
                    this.msgID = bytes.readInt32();
                    this.demobuffs = [];
                    var demobuffsSize = bytes.readUint8();
                    var demoBuff;
                    for (var index = 0; index < demobuffsSize; index++) {
                        demoBuff = new models.DemoBuffVo();
                        demoBuff.fromByteArray(bytes);
                        this.demobuffs.push(demoBuff);
                    }
                };
                return DemoExecuteVo;
            }());
            models.DemoExecuteVo = DemoExecuteVo;
        })(models = scene.models || (scene.models = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=DemoExecuteVo.js.map