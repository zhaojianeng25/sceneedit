/**
* @Author: LinQiuWen
* @description:m职业师父对照表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var SchoolMasterSkillInfoBaseVo = /** @class */ (function () {
                function SchoolMasterSkillInfoBaseVo() {
                }
                SchoolMasterSkillInfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.masterid = data.getUint32();
                };
                return SchoolMasterSkillInfoBaseVo;
            }());
            template.SchoolMasterSkillInfoBaseVo = SchoolMasterSkillInfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=SchoolMasterSkillInfoBaseVo.js.map