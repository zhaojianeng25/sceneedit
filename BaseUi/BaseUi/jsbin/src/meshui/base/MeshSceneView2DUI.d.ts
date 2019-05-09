declare module prop {
    class MeshSceneView2DUI extends BaseReflComponent {
        protected textLabelUI: TextLabelUI;
        protected textureUrlText: TextLabelUI;
        protected texturePicUi: TexturePicUi;
        protected initView(): void;
        private sceneManager;
        protected initScene(): void;
        private upDataFun;
        private oneByFrame;
        destory(): void;
        data: any;
        refreshViewValue(): void;
        x: number;
        y: number;
        label: string;
    }
}
