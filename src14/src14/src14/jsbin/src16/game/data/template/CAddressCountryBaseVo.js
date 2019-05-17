/**
* name  d地理位置市表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CAddressCountryBaseVo = /** @class */ (function () {
                function CAddressCountryBaseVo() {
                }
                CAddressCountryBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.strcountry = data.getUTFBytes(data.getUint32());
                    this.nprovinceid = data.getUint32();
                };
                return CAddressCountryBaseVo;
            }());
            template.CAddressCountryBaseVo = CAddressCountryBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CAddressCountryBaseVo.js.map