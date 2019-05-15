/**
* 符文请求信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var models;
            (function (models) {
                var RuneInfoVo = /** @class */ (function () {
                    function RuneInfoVo() {
                    }
                    RuneInfoVo.prototype.fromByteArray = function (bytes) {
                        this.roleid = bytes.readLong();
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.targetroleid = bytes.readLong();
                        this.targetrolename = ByteArrayUtils.readUtf16String(bytes);
                        this.level = bytes.readInt32();
                        this.school = bytes.readInt32();
                        this.shape = bytes.readInt32();
                        this.givenum = bytes.readInt32();
                        this.acceptnum = bytes.readInt32();
                        this.actiontype = bytes.readInt32();
                        this.requesttime = bytes.readLong();
                        this.itemid = bytes.readInt32();
                        this.itemlevel = bytes.readInt32();
                    };
                    return RuneInfoVo;
                }());
                models.RuneInfoVo = RuneInfoVo;
            })(models = family.models || (family.models = {}));
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RuneInfoVo.js.map