/**
* 人物信息
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var models;
        (function (models) {
            var RoleBasicVo = /** @class */ (function () {
                function RoleBasicVo() {
                }
                RoleBasicVo.prototype.fromByteArray = function (bytes) {
                    this.rolebasicOctets = new models.RoleBasicOctetsVo();
                    var rolebyte = bytes;
                    var head = ByteArrayUtils.uncompact_uint32(rolebyte);
                    this.rolebasicOctets.fromByteArray(rolebyte);
                    this.pos = new Vector2();
                    this.pos.x = rolebyte.readInt16() / 16;
                    this.pos.y = rolebyte.readInt16() / 16;
                    this.posz = rolebyte.readByte();
                    this.poses = new Array();
                    var posesSize = ByteArrayUtils.uncompact_uint32(rolebyte);
                    var pos;
                    for (var index = 0; index < posesSize; index++) {
                        pos = new Vector2();
                        pos.x = rolebyte.readInt16() / 16;
                        pos.y = rolebyte.readInt16() / 16;
                        this.poses.push(pos);
                    }
                };
                return RoleBasicVo;
            }());
            models.RoleBasicVo = RoleBasicVo;
        })(models = scene.models || (scene.models = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleBasicVo.js.map