/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var models;
        (function (models) {
            var NewResultItemVo = /** @class */ (function () {
                function NewResultItemVo() {
                }
                NewResultItemVo.prototype.fromByteArray = function (bytes) {
                    this.demoExecuteVo = new models.DemoExecuteVo();
                    this.demoExecuteVo.fromByteArray(bytes); //DemoExecute
                    this.subresultlist = [];
                    var subresultlistSize = bytes.readUint8();
                    var newSubResultItem;
                    for (var index = 0; index < subresultlistSize; index++) {
                        newSubResultItem = new models.NewSubResultItemVo();
                        newSubResultItem.fromByteArray(bytes);
                        this.subresultlist.push(newSubResultItem);
                    } //NewSubResultItem
                    this.newfighter = [];
                    var newfighterSize = bytes.readUint8();
                    var fighterInfo;
                    for (var index = 0; index < newfighterSize; index++) {
                        fighterInfo = new models.FighterInfoVo();
                        fighterInfo.fromByteArray(bytes);
                        this.newfighter.push(fighterInfo);
                    } //FighterInfo
                    var mapSize = bytes.readUint8();
                    this.roleChangedAttrs = new Laya.Dictionary();
                    for (var index = 0; index < mapSize; index++) {
                        this.roleChangedAttrs.set(bytes.readUint32(), bytes.readFloat());
                    }
                    mapSize = bytes.readUint8();
                    this.petChangedAttrs = new Laya.Dictionary();
                    for (var index = 0; index < mapSize; index++) {
                        this.petChangedAttrs.set(bytes.readUint32(), bytes.readFloat());
                    }
                };
                return NewResultItemVo;
            }());
            models.NewResultItemVo = NewResultItemVo;
        })(models = scene.models || (scene.models = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=NewResultItemVo.js.map