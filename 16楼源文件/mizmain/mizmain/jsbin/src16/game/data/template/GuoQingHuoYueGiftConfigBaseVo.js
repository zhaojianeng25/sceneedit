/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var GuoQingHuoYueGiftConfigBaseVo = /** @class */ (function () {
                function GuoQingHuoYueGiftConfigBaseVo() {
                }
                GuoQingHuoYueGiftConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.hyd1 = data.getUint32();
                    this.itemid1 = data.getUint32();
                    this.itemnum1 = data.getUint32();
                    this.hyd2 = data.getUint32();
                    this.itemid2 = data.getUint32();
                    this.itemnum2 = data.getUint32();
                    this.hyd3 = data.getUint32();
                    this.itemid3 = data.getUint32();
                    this.itemnum3 = data.getUint32();
                    this.hyd4 = data.getUint32();
                    this.itemid4 = data.getUint32();
                    this.itemnum4 = data.getUint32();
                    this.hyd5 = data.getUint32();
                    this.itemid5 = data.getUint32();
                    this.itemnum5 = data.getUint32();
                };
                return GuoQingHuoYueGiftConfigBaseVo;
            }());
            template.GuoQingHuoYueGiftConfigBaseVo = GuoQingHuoYueGiftConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=GuoQingHuoYueGiftConfigBaseVo.js.map