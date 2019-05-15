/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var FoodAndDrugEffectBaseVo = /** @class */ (function () {
                function FoodAndDrugEffectBaseVo() {
                }
                FoodAndDrugEffectBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.itemtypeid = data.getUint32();
                    this.level = data.getUint32();
                    this.effectdescribe = data.getUTFBytes(data.getUint32());
                    var effectLength = data.getUint32();
                    this.effect = [];
                    for (var index = 0; index < effectLength; index++) {
                        this.effect.push(data.getUint32());
                    }
                    this.bCanSale = data.getUint32();
                    this.dbCanSale = data.getUint32();
                    this.funtionid = data.getUint32();
                    this.needPengrenLevel = data.getUTFBytes(data.getUint32());
                    this.pengrenWeight = data.getUTFBytes(data.getUint32());
                    this.needLianyaoLevel = data.getUTFBytes(data.getUint32());
                    this.lianyaoWeight = data.getUTFBytes(data.getUint32());
                    this.lianyaoMaterialWeight = data.getUTFBytes(data.getUint32());
                    this.needQuality = data.getUint32();
                    this.itemNameColor = data.getUTFBytes(data.getUint32());
                    this.treasure = data.getUint32();
                    this.niscrossitem = data.getUint32();
                    this.ncrosssell = data.getUint32();
                    this.nsellprice = data.getUTFBytes(data.getUint32());
                    this.nqualitylv = data.getUint32();
                };
                return FoodAndDrugEffectBaseVo;
            }());
            template.FoodAndDrugEffectBaseVo = FoodAndDrugEffectBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=FoodAndDrugEffectBaseVo.js.map