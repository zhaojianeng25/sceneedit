/**
* @Author: LinQiuWen
* @description:
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CaddpointchangeBaseVo = /** @class */ (function () {
                function CaddpointchangeBaseVo() {
                }
                CaddpointchangeBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.consume = data.getUint32();
                };
                return CaddpointchangeBaseVo;
            }());
            template.CaddpointchangeBaseVo = CaddpointchangeBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CaddpointchangeBaseVo.js.map