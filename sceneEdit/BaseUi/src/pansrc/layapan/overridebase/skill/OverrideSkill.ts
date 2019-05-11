module layapan.me {
    import SkillType = Pan3d.me.SkillType;
    import SkillFixEffect = Pan3d.me.SkillFixEffect;
    import SkillTrajectory = Pan3d.me.SkillTrajectory;
    import SkillTrajectoryTargetKeyVo = Pan3d.me.SkillTrajectoryTargetKeyVo;
    import SkillMulTrajectory = Pan3d.me.SkillMulTrajectory;
    import SkillKey = Pan3d.me.SkillKey;
    import SkillData = Pan3d.me.SkillData;
    import SkillVo = Pan3d.me.SkillVo;
    
    export class OverrideSkill extends Pan3d.me.Skill {
        public skillManager: LayaOverride2dSkillManager
        public baseName: string ="OverrideSkill"
        public constructor($skillManager: LayaOverride2dSkillManager = null) {
  
            super();
            this.skillManager = $skillManager
        }
        public skillComplete(): void {
            this.skillManager.removeSkill(this);
            this.isDeath = true;
            if (this.completeFun) {
                this.completeFun();
            }
            this.idleTime = 0;
        }
        public setData($data: any, $skillData: SkillData): void {
            if (this.hasDestory) {
                return;
            }
            this.skillVo = new SkillVo();
            this.skillVo.setData($data);
            this.setKeyAry();
            this.trajectoryAry = new Array;
            this._skillData = $skillData;
        }
        public setKeyAry(): void {
            this.keyAry = new Array;
            if (this.skillVo.types == SkillType.FixEffect) {
                for (var i: number = 0; i < this.skillVo.keyAry.length; i++) {
                    var keySkill: OverrideSkillFixEffect = new OverrideSkillFixEffect(this);
                    keySkill.setInfo(this.skillVo.keyAry[i]);
                    keySkill.removeCallFun = ($key: SkillKey) => { this.removeKey($key) };
                    keySkill.active = this.active;
                    this.keyAry.push(keySkill);
                }
            } else if (this.skillVo.types == SkillType.TrajectoryDynamicTarget || this.skillVo.types == SkillType.TrajectoryDynamicPoint) {
                for (var i: number = 0; i < this.skillVo.keyAry.length; i++) {

                    var trajectory: SkillTrajectory;
                    var tkv: SkillTrajectoryTargetKeyVo = <SkillTrajectoryTargetKeyVo>(this.skillVo.keyAry[i]);
                    if (tkv.multype == 1) {
                        //trajectory = new SkillMulTrajectory();
                    } else {
                        trajectory = new OverrideSkillTrajectory();
                       ( <OverrideSkillTrajectory> trajectory).skill=this
                    }

                    trajectory.setInfo(this.skillVo.keyAry[i]);
                    this.keyAry.push(trajectory);
                }
            }
        }
    }

}