/**
* @Author: LinQiuWen
* @description:z转职费用配置
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CChangeSchoolCostBaseVo = /** @class */ (function () {
                function CChangeSchoolCostBaseVo() {
                }
                CChangeSchoolCostBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.originalcost = data.getUint32();
                    this.currentprice = data.getUint32();
                    this.discounticon = data.getUTFBytes(data.getUint32());
                    this.discountrate = data.getUint32();
                };
                return CChangeSchoolCostBaseVo;
            }());
            template.CChangeSchoolCostBaseVo = CChangeSchoolCostBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CChangeSchoolCostBaseVo.js.map