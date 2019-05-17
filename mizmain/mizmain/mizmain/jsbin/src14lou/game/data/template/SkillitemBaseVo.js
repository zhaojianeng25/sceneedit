/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var SkillitemBaseVo = /** @class */ (function () {
                function SkillitemBaseVo() {
                }
                SkillitemBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.skillname = data.getUTFBytes(data.getUint32());
                    this.sType = data.getUTFBytes(data.getUint32());
                    this.paramA = data.getFloat64();
                    this.paramB = data.getFloat64();
                    this.costA = data.getUTFBytes(data.getUint32());
                    this.paramC = data.getFloat64();
                    this.paramD = data.getFloat64();
                    this.costB = data.getUTFBytes(data.getUint32());
                    this.costTypeA = data.getUint32();
                    this.costTypeB = data.getUint32();
                    this.normalIcon = data.getUint32();
                    this.skilldescribe = data.getUTFBytes(data.getUint32());
                    this.targettype = data.getUint32();
                    this.bCanUseInBattle = data.getUint32();
                    this.effectid = data.getUint32();
                };
                return SkillitemBaseVo;
            }());
            template.SkillitemBaseVo = SkillitemBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=SkillitemBaseVo.js.map