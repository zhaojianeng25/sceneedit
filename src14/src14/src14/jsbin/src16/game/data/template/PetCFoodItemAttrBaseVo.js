/**
* name s食品表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PetCFoodItemAttrBaseVo = /** @class */ (function () {
                function PetCFoodItemAttrBaseVo() {
                }
                PetCFoodItemAttrBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.addpetlife = data.getUTFBytes(data.getUint32());
                };
                return PetCFoodItemAttrBaseVo;
            }());
            template.PetCFoodItemAttrBaseVo = PetCFoodItemAttrBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PetCFoodItemAttrBaseVo.js.map