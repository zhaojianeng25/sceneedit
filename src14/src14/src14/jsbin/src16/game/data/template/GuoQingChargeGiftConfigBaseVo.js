/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var GuoQingChargeGiftConfigBaseVo = /** @class */ (function () {
                function GuoQingChargeGiftConfigBaseVo() {
                }
                GuoQingChargeGiftConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.itemid1 = data.getUint32();
                    this.itemnum1 = data.getUint32();
                    this.title = data.getUTFBytes(data.getUint32());
                    this.desc = data.getUTFBytes(data.getUint32());
                };
                return GuoQingChargeGiftConfigBaseVo;
            }());
            template.GuoQingChargeGiftConfigBaseVo = GuoQingChargeGiftConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=GuoQingChargeGiftConfigBaseVo.js.map