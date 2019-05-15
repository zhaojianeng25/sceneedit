/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var BankConfigBaseVo = /** @class */ (function () {
                function BankConfigBaseVo() {
                }
                BankConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.buynummin = data.getUint32();
                    this.buynummax = data.getUint32();
                    this.buyunitmin = data.getUint32();
                    this.buyunitmax = data.getUint32();
                    this.buyfee = data.getFloat64();
                    this.sellnummin = data.getUint32();
                    this.sellnummax = data.getUint32();
                    this.sellunitmin = data.getUint32();
                    this.sellunitmax = data.getUint32();
                    this.cellfee = data.getFloat64();
                };
                return BankConfigBaseVo;
            }());
            template.BankConfigBaseVo = BankConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=BankConfigBaseVo.js.map