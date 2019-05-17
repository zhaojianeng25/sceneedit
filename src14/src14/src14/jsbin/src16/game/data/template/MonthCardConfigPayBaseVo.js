/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var MonthCardConfigPayBaseVo = /** @class */ (function () {
                function MonthCardConfigPayBaseVo() {
                }
                MonthCardConfigPayBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.rewardid = data.getUint32();
                    this.itemid = data.getUint32();
                    this.itemnum = data.getUint32();
                    this.type = data.getUint32();
                };
                return MonthCardConfigPayBaseVo;
            }());
            template.MonthCardConfigPayBaseVo = MonthCardConfigPayBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=MonthCardConfigPayBaseVo.js.map