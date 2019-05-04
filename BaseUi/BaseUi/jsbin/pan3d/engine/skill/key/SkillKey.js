var Pan3d;
(function (Pan3d) {
    var me;
    (function (me) {
        var SkillKey = /** @class */ (function () {
            function SkillKey() {
                this.time = 0;
            }
            SkillKey.prototype.addToRender = function () {
                if (!this.particle) {
                    return;
                }
                this.particle.reset();
                this.particle.sceneVisible = true;
                me.ParticleManager.getInstance().addParticle(this.particle);
            };
            SkillKey.prototype.setInfo = function (obj) {
                this.time = obj.frame * me.Scene_data.frameTime;
                this.particle = me.ParticleManager.getInstance().getParticleByte(me.Scene_data.fileRoot + obj.url);
            };
            SkillKey.prototype.reset = function () {
                //this.time = 0;
                this.particle.reset();
                me.ParticleManager.getInstance().removeParticle(this.particle);
            };
            SkillKey.prototype.destory = function () {
                this.particle.destory();
                this.particle = null;
                this.removeCallFun = null;
            };
            return SkillKey;
        }());
        me.SkillKey = SkillKey;
    })(me = Pan3d.me || (Pan3d.me = {}));
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkillKey.js.map