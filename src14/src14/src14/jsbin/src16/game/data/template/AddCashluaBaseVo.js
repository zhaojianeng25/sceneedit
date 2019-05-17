/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var AddCashluaBaseVo = /** @class */ (function () {
                function AddCashluaBaseVo() {
                }
                AddCashluaBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.sellpricenum = data.getUint32();
                    this.itemicon = data.getUTFBytes(data.getUint32());
                    this.kind = data.getUint32();
                    this.roofid = data.getUTFBytes(data.getUint32());
                    this.maxcash = data.getUint32();
                    this.cashkind = data.getUint32();
                    this.unititem = data.getUTFBytes(data.getUint32());
                    this.foodid = data.getUTFBytes(data.getUint32());
                    this.dayRes = data.getUTFBytes(data.getUint32());
                    this.foodname = data.getUTFBytes(data.getUint32());
                    this.credit = data.getUint32();
                };
                return AddCashluaBaseVo;
            }());
            template.AddCashluaBaseVo = AddCashluaBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=AddCashluaBaseVo.js.map