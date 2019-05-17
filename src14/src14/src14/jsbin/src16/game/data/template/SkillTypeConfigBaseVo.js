/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var SkillTypeConfigBaseVo = /** @class */ (function () {
                function SkillTypeConfigBaseVo() {
                }
                SkillTypeConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.skilltype = data.getUint32();
                    this.skillname = data.getUTFBytes(data.getUint32());
                    this.showskillname = data.getUint32();
                };
                return SkillTypeConfigBaseVo;
            }());
            template.SkillTypeConfigBaseVo = SkillTypeConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=SkillTypeConfigBaseVo.js.map