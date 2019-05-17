/**
* @Author: LinQiuWen
* @description:F服务器等级持续时间表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ServiceLevelConfigBaseVo = /** @class */ (function () {
                function ServiceLevelConfigBaseVo() {
                }
                ServiceLevelConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.slevel = data.getUint32();
                    this.lastday = data.getUint32();
                    this.openday = data.getUint32();
                };
                return ServiceLevelConfigBaseVo;
            }());
            template.ServiceLevelConfigBaseVo = ServiceLevelConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ServiceLevelConfigBaseVo.js.map