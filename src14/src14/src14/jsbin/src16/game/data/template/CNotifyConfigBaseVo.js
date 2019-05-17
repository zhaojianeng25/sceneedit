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
            var CNotifyConfigBaseVo = /** @class */ (function () {
                function CNotifyConfigBaseVo() {
                }
                CNotifyConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.text = data.getUTFBytes(data.getUint32());
                };
                return CNotifyConfigBaseVo;
            }());
            template.CNotifyConfigBaseVo = CNotifyConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CNotifyConfigBaseVo.js.map