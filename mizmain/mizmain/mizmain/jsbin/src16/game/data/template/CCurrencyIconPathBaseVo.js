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
            var CCurrencyIconPathBaseVo = /** @class */ (function () {
                function CCurrencyIconPathBaseVo() {
                }
                CCurrencyIconPathBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.iconpath = data.getUTFBytes(data.getUint32());
                    this.explain = data.getUTFBytes(data.getUint32());
                };
                return CCurrencyIconPathBaseVo;
            }());
            template.CCurrencyIconPathBaseVo = CCurrencyIconPathBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CCurrencyIconPathBaseVo.js.map