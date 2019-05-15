/**
* name t通用配置表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CCommonBaseVo = /** @class */ (function () {
                function CCommonBaseVo() {
                }
                CCommonBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.value = data.getUTFBytes(data.getUint32());
                };
                return CCommonBaseVo;
            }());
            template.CCommonBaseVo = CCommonBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CCommonBaseVo.js.map