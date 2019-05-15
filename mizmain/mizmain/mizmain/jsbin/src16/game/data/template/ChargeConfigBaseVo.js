/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ChargeConfiBaseVo = /** @class */ (function () {
                function ChargeConfiBaseVo() {
                }
                ChargeConfiBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.serverid = data.getUint32();
                    this.roofid = data.getUTFBytes(data.getUint32());
                    this.sellpricenum = data.getUint32();
                    this.sellnum = data.getUint32();
                    this.sellnummore = data.getUint32();
                    this.kind = data.getUint32();
                    this.name = data.getUint32();
                    this.gameshow = data.getUint32();
                    this.productid = data.getUTFBytes(data.getUint32());
                    this.productstr = data.getUint32();
                    this.chargecount = data.getUint32();
                };
                return ChargeConfiBaseVo;
            }());
            template.ChargeConfiBaseVo = ChargeConfiBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ChargeConfigBaseVo.js.map