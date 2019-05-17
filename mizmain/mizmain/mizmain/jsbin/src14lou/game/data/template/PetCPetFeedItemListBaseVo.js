/**
* name c宠物培养显示表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PetCPetFeedItemListBaseVo = /** @class */ (function () {
                function PetCPetFeedItemListBaseVo() {
                }
                PetCPetFeedItemListBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.itemid = data.getUint32();
                };
                return PetCPetFeedItemListBaseVo;
            }());
            template.PetCPetFeedItemListBaseVo = PetCPetFeedItemListBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PetCPetFeedItemListBaseVo.js.map