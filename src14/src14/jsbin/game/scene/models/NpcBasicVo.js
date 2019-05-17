/**
* npc数据
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var models;
        (function (models) {
            var NpcBasicVo = /** @class */ (function () {
                function NpcBasicVo() {
                    /**坐标*/
                    this.destPos = new Vector2();
                }
                NpcBasicVo.prototype.fromByteArray = function (bytes) {
                    this.npckey = bytes.readLong();
                    this.id = bytes.readInt32();
                    this.name = ByteArrayUtils.readUtf16String(bytes);
                    this.pos = new Vector2();
                    this.pos.x = bytes.readInt16() / 16;
                    this.pos.y = bytes.readInt16() / 16;
                    this.posz = bytes.readByte();
                    this.destPos = new Vector2();
                    this.destPos.x = bytes.readInt16() / 16;
                    this.destPos.y = bytes.readInt16() / 16;
                    this.speed = bytes.readInt32();
                    this.dir = bytes.readInt32();
                    this.shape = bytes.readInt32();
                    this.scenestate = bytes.readInt32();
                    var mapSize = ByteArrayUtils.uncompact_uint32(bytes);
                    this.components = new Laya.Dictionary();
                    for (var index = 0; index < mapSize; index++) {
                        this.components.set(bytes.readByte(), bytes.readInt32());
                    }
                };
                return NpcBasicVo;
            }());
            models.NpcBasicVo = NpcBasicVo;
        })(models = scene.models || (scene.models = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=NpcBasicVo.js.map