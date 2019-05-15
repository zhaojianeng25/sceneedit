declare module prop {
    class PropModel {
        private static _instance;
        static getInstance(): PropModel;
        resize(): void;
        constructor();
        propPanle: UiMeshSprite;
        private metaDataView;
        private lastNodel;
        hidePanel(): void;
        showPanel($ui: materialui.BaseMaterialNodeUI): void;
        showPefabMesh(value: MetaDataView): void;
        private showSciencePropPanel;
        private _top;
        moveTop($ty: number): void;
    }
}
