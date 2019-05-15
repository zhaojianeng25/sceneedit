/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PetSkillConfigBaseVo = /** @class */ (function () {
                function PetSkillConfigBaseVo() {
                }
                PetSkillConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.skillname = data.getUTFBytes(data.getUint32());
                    this.param = data.getUTFBytes(data.getUint32());
                    this.costnum = data.getUint32();
                    this.costType = data.getUint32();
                    this.icon = data.getUint32();
                    this.skilltype = data.getUint32();
                    this.littledes = data.getUTFBytes(data.getUint32());
                    this.skilldescribe = data.getUTFBytes(data.getUint32());
                    this.targettype = data.getUint32();
                    this.effectid = data.getUint32();
                    this.score = data.getUint32();
                    this.color = data.getUint32();
                };
                return PetSkillConfigBaseVo;
            }());
            template.PetSkillConfigBaseVo = PetSkillConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PetSkillConfigBaseVo.js.map