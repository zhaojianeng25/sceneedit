/**
* name c宠物灵兽提升
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PetCShenShouIncBaseVo = /** @class */ (function () {
                function PetCShenShouIncBaseVo() {
                }
                PetCShenShouIncBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.petid = data.getUint32();
                    this.inccount = data.getUint32();
                    this.attinc = data.getUint32();
                    this.atkinc = data.getUint32();
                    this.definc = data.getUint32();
                    this.hpinc = data.getUint32();
                    this.mpinc = data.getUint32();
                    this.spdinc = data.getUint32();
                    this.inclv = data.getUint32();
                };
                return PetCShenShouIncBaseVo;
            }());
            template.PetCShenShouIncBaseVo = PetCShenShouIncBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PetCShenShouIncBaseVo.js.map