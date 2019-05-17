/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PetItemEffectBaseVo = /** @class */ (function () {
                function PetItemEffectBaseVo() {
                }
                PetItemEffectBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.petskillid = data.getUint32();
                    this.effectdes = data.getUTFBytes(data.getUint32());
                    var effecttypeLength = data.getUint32();
                    this.effecttype = [];
                    for (var index = 0; index < effecttypeLength; index++) {
                        this.effecttype.push(data.getUint32());
                    }
                    var effectLength = data.getUint32();
                    this.effect = [];
                    for (var index = 0; index < effectLength; index++) {
                        this.effect.push(data.getUint32());
                    }
                    this.bCanSale = data.getUint32();
                    this.dbCanSale = data.getUint32();
                    this.treasure = data.getUint32();
                };
                return PetItemEffectBaseVo;
            }());
            template.PetItemEffectBaseVo = PetItemEffectBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PetItemEffectBaseVo.js.map