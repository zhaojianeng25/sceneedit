/**
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var achievent;
        (function (achievent) {
            var models;
            (function (models) {
                var ArchiveInfoVo = /** @class */ (function () {
                    function ArchiveInfoVo() {
                    }
                    ArchiveInfoVo.prototype.fromByteArray = function (bytes) {
                        this.archiveid = bytes.readInt32();
                        this.state = bytes.readInt32();
                    };
                    return ArchiveInfoVo;
                }());
                models.ArchiveInfoVo = ArchiveInfoVo;
            })(models = achievent.models || (achievent.models = {}));
        })(achievent = modules.achievent || (modules.achievent = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ArchiveInfoVo.js.map