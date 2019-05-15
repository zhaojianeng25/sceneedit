/**
* name c宠物物品表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PetCPetFeedItemAttrBaseVo = /** @class */ (function () {
                function PetCPetFeedItemAttrBaseVo() {
                }
                PetCPetFeedItemAttrBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.addpetexp = data.getUint32();
                    this.addpetlife = data.getUint32();
                };
                return PetCPetFeedItemAttrBaseVo;
            }());
            template.PetCPetFeedItemAttrBaseVo = PetCPetFeedItemAttrBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PetCPetFeedItemAttrBaseVo.js.map