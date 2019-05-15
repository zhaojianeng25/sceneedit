declare module prop {
    class MeshMaterialLfetView2DUI extends MeshSceneView2DUI {
        x: number;
        resize(): void;
        protected texturePicUiChange($evt: ReflectionEvet): void;
        private defFileUrl;
        private refrishShowMaterialModel;
        width: number;
        constructor(value: UiMeshSprite);
        private setObjUrlToSprite;
        private showSprite;
        refreshViewValue(): void;
    }
}
