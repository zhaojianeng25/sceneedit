declare module prop {
    class MeshMaterialLfetView2DUI extends MeshSceneView2DUI {
        x: number;
        constructor(value: UiMeshSprite);
        private showSprite;
        refreshViewValue(): void;
    }
}
