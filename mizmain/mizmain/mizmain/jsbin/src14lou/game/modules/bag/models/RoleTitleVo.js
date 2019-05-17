/**
* 人物称谓 by ljm
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var bag;
        (function (bag) {
            var models;
            (function (models) {
                var RoleTitleVo = /** @class */ (function () {
                    function RoleTitleVo() {
                    }
                    RoleTitleVo.prototype.fromByteArray = function (bytes) {
                        this.titleid = bytes.readInt32();
                        this.name = ByteArrayUtils.readUtf16String(bytes);
                        this.availtime = ByteArrayUtils.readLong(bytes);
                    };
                    return RoleTitleVo;
                }());
                models.RoleTitleVo = RoleTitleVo;
            })(models = bag.models || (bag.models = {}));
        })(bag = modules.bag || (modules.bag = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleTitleVo.js.map