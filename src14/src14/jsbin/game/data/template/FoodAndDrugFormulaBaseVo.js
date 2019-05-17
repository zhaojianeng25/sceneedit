/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var FoodAndDrugFormulaBaseVo = /** @class */ (function () {
                function FoodAndDrugFormulaBaseVo() {
                }
                FoodAndDrugFormulaBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.neffectid1 = data.getUint32(); //效果1ID
                    this.nformulaa1 = data.getFloat64(); //系数1    double
                    this.nformulab1 = data.getFloat64(); //常数1    double
                    this.neffectid2 = data.getUint32(); //效果2ID
                    this.nformulaa2 = data.getFloat64(); //系数2    double
                    this.nformulab2 = data.getFloat64(); //常数2    double
                    this.ndupercent = data.getUint32(); //中毒概率
                    this.strformula = data.getUTFBytes(data.getUint32());
                };
                return FoodAndDrugFormulaBaseVo;
            }());
            template.FoodAndDrugFormulaBaseVo = FoodAndDrugFormulaBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=FoodAndDrugFormulaBaseVo.js.map