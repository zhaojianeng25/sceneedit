declare module layapan.me {
    import SkillData = Pan3d.me.SkillData;
    class OverrideSkill extends Pan3d.me.Skill {
        skillManager: LayaOverride2dSkillManager;
        baseName: string;
        constructor($skillManager?: LayaOverride2dSkillManager);
        skillComplete(): void;
        setData($data: any, $skillData: SkillData): void;
        setKeyAry(): void;
    }
}
