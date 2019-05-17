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
                var MelonItemBagInfoVo = /** @class */ (function () {
                    function MelonItemBagInfoVo() {
                    }
                    MelonItemBagInfoVo.prototype.fromByteArray = function (bytes) {
                        this.itemkey = bytes.readInt32();
                        this.bagid = bytes.readInt32();
                    };
                    return MelonItemBagInfoVo;
                }());
                models.MelonItemBagInfoVo = MelonItemBagInfoVo;
            })(models = team.models || (team.models = {}));
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=MelonItemBagInfoVo.js.map