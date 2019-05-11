declare module Pan3d.me {
    class SkillData extends ResCount {
        data: any;
        private srcList;
        srcOutAry: Array<Skill>;
        addSrcSkill($skill: Skill): void;
        destory(): void;
        testDestory(): boolean;
    }
}
