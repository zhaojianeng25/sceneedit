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
                var FormBeanVo = /** @class */ (function () {
                    function FormBeanVo() {
                    }
                    FormBeanVo.prototype.fromByteArray = function (bytes) {
                        this.activeTimes = bytes.readUint32();
                        this.level = bytes.readUint32();
                        this.exp = bytes.readUint32();
                    };
                    return FormBeanVo;
                }());
                models.FormBeanVo = FormBeanVo;
            })(models = createrole.models || (createrole.models = {}));
        })(createrole = modules.createrole || (modules.createrole = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FormBeanVo.js.map