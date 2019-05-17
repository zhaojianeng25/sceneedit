/**
* @Author: LinQiuWen
* @description:s属性/y一级属性转换表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var AttrModDataBaseVo = /** @class */ (function () {
                function AttrModDataBaseVo() {
                }
                AttrModDataBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.consfactor = data.getFloat64();
                    this.iqfactor = data.getFloat64();
                    this.strfactor = data.getFloat64();
                    this.endufactor = data.getFloat64();
                    this.agifactor = data.getFloat64();
                };
                return AttrModDataBaseVo;
            }());
            template.AttrModDataBaseVo = AttrModDataBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=AttrModDataBaseVo.js.map