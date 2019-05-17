/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var SkillInfoBaseVo = /** @class */ (function () {
                function SkillInfoBaseVo() {
                }
                SkillInfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.stagelist = data.getUTFBytes(data.getUint32());
                    this.stagelist2 = data.getUTFBytes(data.getUint32());
                };
                return SkillInfoBaseVo;
            }());
            template.SkillInfoBaseVo = SkillInfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=SkillInfoBaseVo.js.map