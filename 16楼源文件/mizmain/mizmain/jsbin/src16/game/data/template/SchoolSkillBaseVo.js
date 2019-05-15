/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var SchoolSkillBaseVo = /** @class */ (function () {
                function SchoolSkillBaseVo() {
                }
                SchoolSkillBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.skillname = data.getUTFBytes(data.getUint32());
                };
                return SchoolSkillBaseVo;
            }());
            template.SchoolSkillBaseVo = SchoolSkillBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=SchoolSkillBaseVo.js.map