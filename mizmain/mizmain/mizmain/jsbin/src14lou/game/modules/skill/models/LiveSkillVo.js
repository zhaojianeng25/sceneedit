/**
* <!-- 生活技能 -->
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var skill;
        (function (skill) {
            var models;
            (function (models) {
                var LiveSkillVo = /** @class */ (function () {
                    function LiveSkillVo() {
                    }
                    LiveSkillVo.prototype.fromByteArray = function (bytes) {
                        this.id = bytes.readUint32();
                        this.level = bytes.readUint32();
                    };
                    return LiveSkillVo;
                }());
                models.LiveSkillVo = LiveSkillVo;
            })(models = skill.models || (skill.models = {}));
        })(skill = modules.skill || (modules.skill = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=LiveSkillVo.js.map