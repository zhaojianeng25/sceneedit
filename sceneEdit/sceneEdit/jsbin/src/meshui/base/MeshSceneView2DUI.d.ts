declare module prop {
    class MeshSceneView2DUI extends BaseReflComponent {
        protected textLabelUI: TextLabelUI;
        protected textureUrlText: TextLabelUI;
        protected texturePicUi: TexturePicUi;
        protected initView(): void;
        protected texturePicUiChange($evt: ReflectionEvet): void;
        private _suffix;
        suffix: string;
        private wheelEventFun;
        onMouseWheel($evt: MouseWheelEvent): void;
        private butClik;
        private lastRotationY;
        private mouseDonwPos;
        private addStagetMouseMove;
        private removeStagetMouseMove;
        private onStageMouseMove;
        private onStageMouseUp;
        protected sceneManager: maineditor.EdItorSceneManager;
        protected initScene(): void;
        private upDataFun;
        private oneByFrame;
        destory(): void;
        data: any;
        private modelKey;
        private addUrlToView;
        refreshViewValue(): void;
        x: number;
        y: number;
        label: string;
    }
}
