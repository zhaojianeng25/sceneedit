/**
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var createrole;
        (function (createrole) {
            var models;
            (function (models) {
                var TitleInfoVo = /** @class */ (function () {
                    function TitleInfoVo() {
                    }
                    TitleInfoVo.prototype.fromByteArray = function (bytes) {
                        this.titleid = bytes.readUint32();
                        this.name = bytes.readUTFBytes(bytes.readUint8());
                        this.availtime = ByteArrayUtils.readLong(bytes);
                    };
                    return TitleInfoVo;
                }());
                models.TitleInfoVo = TitleInfoVo;
            })(models = createrole.models || (createrole.models = {}));
        })(createrole = modules.createrole || (modules.createrole = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TitleInfoVo.js.map