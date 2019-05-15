/**
* name b表情配置
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CbiaoqingBaseVo = /** @class */ (function () {
                function CbiaoqingBaseVo() {
                }
                CbiaoqingBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.imagenum = data.getUint32();
                    this.time = data.getFloat64();
                    this.tips = data.getUTFBytes(data.getUint32());
                    this.key = data.getUTFBytes(data.getUint32());
                };
                return CbiaoqingBaseVo;
            }());
            template.CbiaoqingBaseVo = CbiaoqingBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CbiaoqingBaseVo.js.map