declare module layapan.me {
    class OverrideSkillTrajectory extends Pan3d.me.SkillTrajectory {
        skill: OverrideSkill;
        reset(): void;
        addToRender(): void;
        endPlayFun(e?: Pan3d.me.BaseEvent): void;
        setInfo(obj: Pan3d.me.SkillKeyVo): void;
    }
}
