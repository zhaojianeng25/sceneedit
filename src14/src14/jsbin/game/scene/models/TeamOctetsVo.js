/**
* 队伍信息
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var models;
        (function (models) {
            var TeamOctetsVo = /** @class */ (function () {
                function TeamOctetsVo() {
                }
                TeamOctetsVo.prototype.fromByteArray = function (bytes) {
                    this.teamid = bytes.readLong();
                    this.teamindexstate = bytes.readByte();
                    this.hugindex = bytes.readByte();
                    this.normalnum = bytes.readByte();
                };
                return TeamOctetsVo;
            }());
            models.TeamOctetsVo = TeamOctetsVo;
        })(models = scene.models || (scene.models = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=TeamOctetsVo.js.map