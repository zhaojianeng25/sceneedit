/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var SkillConfigBaseVo = /** @class */ (function () {
                function SkillConfigBaseVo() {
                }
                SkillConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.isonlypve = data.getUint32();
                    this.isfilterbuff = data.getUint32();
                };
                return SkillConfigBaseVo;
            }());
            template.SkillConfigBaseVo = SkillConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=SkillConfigBaseVo.js.map