/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CommonDayPayBaseVo = /** @class */ (function () {
                function CommonDayPayBaseVo() {
                }
                CommonDayPayBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.value = data.getUTFBytes(data.getUint32());
                };
                return CommonDayPayBaseVo;
            }());
            template.CommonDayPayBaseVo = CommonDayPayBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CommonDayPayBaseVo.js.map