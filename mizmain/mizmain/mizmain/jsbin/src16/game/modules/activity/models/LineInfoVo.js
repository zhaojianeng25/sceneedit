/**
* 精英副本信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var activity;
        (function (activity) {
            var models;
            (function (models) {
                var LineInfoVo = /** @class */ (function () {
                    function LineInfoVo() {
                    }
                    LineInfoVo.prototype.fromByteArray = function (bytes) {
                        this.id = bytes.readInt32();
                        this.state = bytes.readInt32();
                        this.finish = bytes.readInt32();
                    };
                    return LineInfoVo;
                }());
                models.LineInfoVo = LineInfoVo;
            })(models = activity.models || (activity.models = {}));
        })(activity = modules.activity || (modules.activity = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=LineInfoVo.js.map