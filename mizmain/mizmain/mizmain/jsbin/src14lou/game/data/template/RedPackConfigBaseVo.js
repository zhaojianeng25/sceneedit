/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var RedPackConfigBaseVo = /** @class */ (function () {
                function RedPackConfigBaseVo() {
                }
                RedPackConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.fushimin = data.getUint32();
                    this.fishimax = data.getUint32();
                    this.daysendmax = data.getUint32();
                    this.dayreceivemax = data.getUint32();
                    this.dayfushisendmax = data.getUint32();
                    this.packmin = data.getUint32();
                    this.packmax = data.getUint32();
                    this.level = data.getUint32();
                };
                return RedPackConfigBaseVo;
            }());
            template.RedPackConfigBaseVo = RedPackConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=RedPackConfigBaseVo.js.map