/**
* 阵法信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var huoban;
        (function (huoban) {
            var models;
            (function (models) {
                var FormBeanVo = /** @class */ (function () {
                    function FormBeanVo() {
                    }
                    FormBeanVo.prototype.fromByteArray = function (bytes) {
                        this.activeTimes = bytes.readInt32();
                        this.level = bytes.readInt32();
                        this.exp = bytes.readInt32();
                    };
                    return FormBeanVo;
                }());
                models.FormBeanVo = FormBeanVo;
            })(models = huoban.models || (huoban.models = {}));
        })(huoban = modules.huoban || (modules.huoban = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FormBeanVo.js.map