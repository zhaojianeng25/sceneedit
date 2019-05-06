declare module LayaPan3D {
    class LayaGame2dDemo extends LayaScene2D {
        constructor(value: string, bfun?: Function);
        protected initScene(): void;
        private mainChar;
        private addSceneModel;
        private isShowBase;
        private addFramePartice;
        addGrouandPic(value: string, rect: Pan3d.me.Rectangle): LayaScene2dPicSprit;
        protected addEvents(): void;
        upData(): void;
        private onMouseWheel;
        private dragRegion;
        private onStartDrag;
    }
}
