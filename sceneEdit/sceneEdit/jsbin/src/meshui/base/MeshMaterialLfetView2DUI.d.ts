declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class MeshMaterialLfetView2DUI extends MeshSceneView2DUI {
        private iconItem;
        protected initView(): void;
        protected butClik(evt: InteractiveEvent): void;
        x: number;
        resize(): void;
        destory(): void;
        protected texturePicUiChange($evt: ReflectionEvet): void;
        private defFileUrl;
        private refrishShowMaterialModel;
        private setZzwUrlToRole;
        protected oneByFrame(): void;
        width: number;
        constructor(value: UiMeshSprite);
        private lastObjUrl;
        private setObjUrlToSprite;
        private modelSprite;
        private roleSprite;
        refreshViewValue(): void;
    }
}
