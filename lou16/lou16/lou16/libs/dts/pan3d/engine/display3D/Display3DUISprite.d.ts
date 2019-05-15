declare module Pan3d.me {
    class Display3DUISprite extends Display3DSprite {
        private uiMatrix;
        private uiViewMatrix;
        private modelRes;
        constructor();
        private loadRes;
        loadResComFinish(): void;
        loadGroup($name: string): void;
        private loadPartRes;
        resize(): void;
        setCam(): void;
        update(): void;
    }
}
