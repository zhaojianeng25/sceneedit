declare module LayaPan3D {
    import EdItorSceneManager = maineditor.EdItorSceneManager;
    class Laya3dSprite extends Laya.Image {
        constructor(value: string, bfun?: Function);
        scale(scaleX: number, scaleY: number, speedMode?: boolean): Sprite;
        private resizeRect;
        protected initScene(): void;
        protected addDisplay(): void;
        protected addRole(): void;
        protected addSkillRole(): void;
        private addLyfSprite;
        private saveBasePrarame;
        private glfrontFace;
        private glviewport;
        private cullFaceModel;
        private depthWriteMask;
        private sFactor;
        private dFactor;
        private program;
        private arrayBuffer;
        private elementArrayBuffer;
        private resetBasePrarame;
        upData(): void;
        protected renderToTexture(): void;
        protected sceneManager: EdItorSceneManager;
    }
}
