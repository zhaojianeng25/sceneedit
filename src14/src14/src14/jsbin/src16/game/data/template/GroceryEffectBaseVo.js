/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var GroceryEffectBaseVo = /** @class */ (function () {
                function GroceryEffectBaseVo() {
                }
                GroceryEffectBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.effect = data.getUTFBytes(data.getUint32());
                    this.bCanSale = data.getUint32();
                    this.dbCanSale = data.getUint32();
                    this.needDuanzaoLevel = data.getUTFBytes(data.getUint32());
                    this.needCaifengLevel = data.getUTFBytes(data.getUint32());
                    this.needLianjinLevel = data.getUTFBytes(data.getUint32());
                    this.tmpType = data.getUTFBytes(data.getUint32());
                    this.treasure = data.getUint32();
                };
                return GroceryEffectBaseVo;
            }());
            template.GroceryEffectBaseVo = GroceryEffectBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=GroceryEffectBaseVo.js.map