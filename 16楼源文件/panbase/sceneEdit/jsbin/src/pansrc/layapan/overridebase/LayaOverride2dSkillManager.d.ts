declare module layapan.me {
    import SkillRes = Pan3d.me.SkillRes;
    import SkillData = Pan3d.me.SkillData;
    import SkillManager = Pan3d.me.SkillManager;
    class LayaOverride2dSkillManager extends SkillManager {
        sceneManager: LayaOverride2dSceneManager;
        constructor($sceneManager: LayaOverride2dSceneManager);
        addSrc($url: string, skillData: SkillData): void;
        playSkill($skill: OverrideSkill): void;
        getSkill($url: string, $name: string, $callback?: Function): OverrideSkill;
        protected loadSkillCom($url: string, $skillRes: SkillRes): void;
    }
}
