/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var HolidayTypeBaseVo = /** @class */ (function () {
                function HolidayTypeBaseVo() {
                }
                HolidayTypeBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.starttime = data.getUTFBytes(data.getUint32());
                    this.endtime = data.getUTFBytes(data.getUint32());
                    this.type = data.getUint32();
                };
                return HolidayTypeBaseVo;
            }());
            template.HolidayTypeBaseVo = HolidayTypeBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=HolidayTypeBaseVo.js.map