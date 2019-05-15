/**
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var team;
        (function (team) {
            var models;
            (function (models) {
                var PosVo = /** @class */ (function () {
                    function PosVo() {
                    }
                    PosVo.prototype.fromByteArray = function (bytes) {
                        this.x = bytes.readUint32();
                        this.y = bytes.readUint32();
                    };
                    return PosVo;
                }());
                models.PosVo = PosVo;
            })(models = team.models || (team.models = {}));
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PosVo.js.map