declare module LayaPan3D {
    class LayaScene3D extends Laya3dSprite {
        constructor(value: string, bfun?: Function);
        protected addEvents(): void;
        protected addSceneModel(): void;
        private onMouseWheel;
        private lastMouseVec2d;
        private lastfocus3D;
        private dragRegion;
        private onStartDrag;
        private onMouseUp;
        private onMouseMove;
        upData(): void;
    }
}
