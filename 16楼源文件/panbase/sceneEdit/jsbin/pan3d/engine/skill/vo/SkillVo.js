var Pan3d;
(function (Pan3d) {
    var me;
    (function (me) {
        var SkillVo = /** @class */ (function () {
            function SkillVo() {
            }
            SkillVo.prototype.setData = function ($info) {
                this.keyAry = new Array;
                if (!$info) {
                    //console.log("技能有错")
                }
                this.action = $info.action;
                this.skillname = $info.skillname;
                this.bloodTime = $info.blood;
                this.types = $info.type;
                if (this.types == SkillType.FixEffect) {
                    this.keyAry = this.getFixEffect($info.data);
                }
                else if (this.types == SkillType.TrajectoryDynamicTarget || this.types == SkillType.TrajectoryDynamicPoint) {
                    this.keyAry = this.getTrajectoryDynamicTarget($info.data);
                }
                if ($info.sound) {
                    this.sound = new me.SkillKeyVo;
                    this.sound.frame = $info.sound.time * me.Scene_data.frameTime;
                    this.sound.url = $info.sound.name;
                }
                if ($info.shock) {
                    this.shockAry = this.getShockAry($info.shock);
                }
            };
            SkillVo.prototype.getShockAry = function ($ary) {
                var keyAry = new Array;
                for (var i = 0; i < $ary.length; i++) {
                    var key = new me.SkillShockVo();
                    key.setData($ary[i]);
                    keyAry.push(key);
                }
                return keyAry;
            };
            SkillVo.prototype.getFixEffect = function ($ary) {
                var keyAry = new Array;
                for (var i = 0; i < $ary.length; i++) {
                    var key = new me.SkillFixEffectKeyVo();
                    key.setData($ary[i]);
                    keyAry.push(key);
                }
                return keyAry;
            };
            SkillVo.prototype.getTrajectoryDynamicTarget = function ($ary) {
                var keyAry = new Array;
                for (var i = 0; i < $ary.length; i++) {
                    var key = new me.SkillTrajectoryTargetKeyVo();
                    key.setData($ary[i]);
                    keyAry.push(key);
                }
                return keyAry;
            };
            SkillVo.defaultBloodTime = 250;
            return SkillVo;
        }());
        me.SkillVo = SkillVo;
        var SkillType = /** @class */ (function () {
            function SkillType() {
            }
            SkillType.TrajectoryDynamicTarget = 1;
            SkillType.FixEffect = 4;
            SkillType.TrajectoryDynamicPoint = 3;
            return SkillType;
        }());
        me.SkillType = SkillType;
    })(me = Pan3d.me || (Pan3d.me = {}));
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkillVo.js.map