/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PetItemEffect_PointCardBaseVo = /** @class */ (function () {
                function PetItemEffect_PointCardBaseVo() {
                }
                PetItemEffect_PointCardBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.petskillid = data.getUint32();
                    this.effectdes = data.getUTFBytes(data.getUint32());
                    var effecttypeLength = data.getUint32();
                    this.effecttype = [];
                    ; //属性名1,属性名2,属性名3,属性名4,属性名5,属性名6 
                    for (var index = 0; index < effecttypeLength; index++) {
                        this.effecttype.push(data.getUint32());
                    }
                    var effectLength = data.getUint32();
                    this.effect = [];
                    ; //属性值1,属性值2,属性值3,属性值4,属性值5,属性值6
                    for (var index = 0; index < effectLength; index++) {
                        this.effect.push(data.getUint32());
                    }
                    this.bCanSale = data.getUint32();
                    this.dbCanSale = data.getUint32();
                    this.treasure = data.getUint32();
                };
                return PetItemEffect_PointCardBaseVo;
            }());
            template.PetItemEffect_PointCardBaseVo = PetItemEffect_PointCardBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PetItemEffect_PointCardBaseVo.js.map