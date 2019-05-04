
module layapan.me {
    import SkillType = Pan3d.me.SkillType;
    import SkillFixEffect = Pan3d.me.SkillFixEffect;
    import SkillTrajectory = Pan3d.me.SkillTrajectory;
    import SkillTrajectoryTargetKeyVo = Pan3d.me.SkillTrajectoryTargetKeyVo;
    import SkillMulTrajectory = Pan3d.me.SkillMulTrajectory;
    import SkillKey = Pan3d.me.SkillKey;

    export class OverrideSkillFixEffectKeyVo extends Pan3d.me.SkillFixEffectKeyVo {
        public constructor() {
            super();
            console.log("OverrideSkillFixEffectKeyVo")
        }
    }
}