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
                var RoleRollInfoVo = /** @class */ (function () {
                    function RoleRollInfoVo() {
                    }
                    RoleRollInfoVo.prototype.fromByteArray = function (bytes) {
                        this.roleid = bytes.readLong();
                        this.rolename = bytes.readUTFBytes(bytes.readUint8());
                        this.roll = bytes.readInt32();
                    };
                    return RoleRollInfoVo;
                }());
                models.RoleRollInfoVo = RoleRollInfoVo;
            })(models = team.models || (team.models = {}));
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleRollInfoVo.js.map