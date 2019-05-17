/**
* name <!-- 修炼技能 -->
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var skill;
        (function (skill) {
            var models;
            (function (models) {
                var ParticleSkillVo = /** @class */ (function () {
                    function ParticleSkillVo() {
                    }
                    ParticleSkillVo.prototype.fromByteArray = function (bytes) {
                        this.id = bytes.readInt32();
                        this.level = bytes.readInt32();
                        this.maxlevel = bytes.readUint32();
                        this.exp = bytes.readInt32();
                        this.effects = new Laya.Dictionary();
                        var effectsSize = bytes.readUint8();
                        for (var index = 0; index < effectsSize; index++) {
                            this.effects.set(bytes.readInt32(), bytes.readFloat());
                        }
                        this.nexteffect = new Laya.Dictionary();
                        var nexteffectSize = bytes.readUint8();
                        for (var index = 0; index < nexteffectSize; index++) {
                            this.nexteffect.set(bytes.readInt32(), bytes.readFloat());
                        }
                    };
                    return ParticleSkillVo;
                }());
                models.ParticleSkillVo = ParticleSkillVo;
            })(models = skill.models || (skill.models = {}));
        })(skill = modules.skill || (modules.skill = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ParticleSkillVo.js.map