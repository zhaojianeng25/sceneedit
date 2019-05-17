/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var HolidayGiftConfigBaseVo = /** @class */ (function () {
                function HolidayGiftConfigBaseVo() {
                }
                HolidayGiftConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.day = data.getUTFBytes(data.getUint32());
                    this.daytext = data.getUTFBytes(data.getUint32());
                    this.itemid1 = data.getUint32();
                    this.itemnum1 = data.getUint32();
                    this.itemid2 = data.getUint32();
                    this.itemnum2 = data.getUint32();
                    this.itemid3 = data.getUint32();
                    this.itemnum3 = data.getUint32();
                    this.text = data.getUTFBytes(data.getUint32());
                };
                return HolidayGiftConfigBaseVo;
            }());
            template.HolidayGiftConfigBaseVo = HolidayGiftConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=HolidayGiftConfigBaseVo.js.map