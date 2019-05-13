declare module Pan3d.me {
    class SkillEffect extends SkillKey {
        active: Object3D;
        addToRender(): void;
        protected onPlayCom(event?: Event): void;
    }
}
