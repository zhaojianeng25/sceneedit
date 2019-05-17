/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var WeekListBaseVo = /** @class */ (function () {
                function WeekListBaseVo() {
                }
                WeekListBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.week = data.getUint32();
                    this.text1 = data.getUTFBytes(data.getUint32());
                    this.time1 = data.getUTFBytes(data.getUint32());
                    this.text2 = data.getUTFBytes(data.getUint32());
                    this.time2 = data.getUTFBytes(data.getUint32());
                    this.text3 = data.getUTFBytes(data.getUint32());
                    this.time3 = data.getUTFBytes(data.getUint32());
                    this.text4 = data.getUTFBytes(data.getUint32());
                    this.time4 = data.getUTFBytes(data.getUint32());
                    this.text5 = data.getUTFBytes(data.getUint32());
                    this.time5 = data.getUTFBytes(data.getUint32());
                };
                return WeekListBaseVo;
            }());
            template.WeekListBaseVo = WeekListBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=WeekListBaseVo.js.map