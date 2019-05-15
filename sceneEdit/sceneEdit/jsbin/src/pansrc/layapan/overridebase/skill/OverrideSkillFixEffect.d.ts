declare module layapan.me {
    class OverrideSkillFixEffect extends Pan3d.SkillFixEffect {
        skill: OverrideSkill;
        constructor($skillvo: OverrideSkill);
        protected onPlayCom(event?: Event): void;
        addToRender(): void;
    }
}
