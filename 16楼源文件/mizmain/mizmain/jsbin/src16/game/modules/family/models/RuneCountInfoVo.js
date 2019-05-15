/**
* 符文统计
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var models;
            (function (models) {
                var RuneCountInfoVo = /** @class */ (function () {
                    function RuneCountInfoVo() {
                    }
                    RuneCountInfoVo.prototype.fromByteArray = function (bytes) {
                        this.roleid = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.level = bytes.readInt32();
                        this.school = bytes.readInt32();
                        this.position = bytes.readInt32();
                        this.givenum = bytes.readInt32();
                        this.acceptnum = bytes.readInt32();
                        this.givelevel = bytes.readInt32();
                    };
                    return RuneCountInfoVo;
                }());
                models.RuneCountInfoVo = RuneCountInfoVo;
            })(models = family.models || (family.models = {}));
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RuneCountInfoVo.js.map