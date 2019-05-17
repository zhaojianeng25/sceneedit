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
                var RollMelonVo = /** @class */ (function () {
                    function RollMelonVo() {
                    }
                    RollMelonVo.prototype.fromByteArray = function (bytes) {
                        this.melonid = bytes.readLong();
                        this.itemid = bytes.readInt32();
                        this.itemnum = bytes.readInt32();
                    };
                    return RollMelonVo;
                }());
                models.RollMelonVo = RollMelonVo;
            })(models = team.models || (team.models = {}));
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RollMelonVo.js.map