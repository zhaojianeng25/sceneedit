/**
* @Author: LinQiuWen
* @description:F服务器经验限制表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ServiceExpConfigBaseVo = /** @class */ (function () {
                function ServiceExpConfigBaseVo() {
                }
                ServiceExpConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.midlevel = data.getInt32();
                    this.bili = data.getFloat64();
                };
                return ServiceExpConfigBaseVo;
            }());
            template.ServiceExpConfigBaseVo = ServiceExpConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ServiceExpConfigBaseVo.js.map