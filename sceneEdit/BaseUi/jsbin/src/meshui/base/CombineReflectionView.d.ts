declare module prop {
    class CombineReflectionView extends MetaDataView {
        private list;
        constructor(value: UiMeshSprite);
        addView($view: MetaDataView): void;
        refreshViewValue(): void;
        destory(): void;
        resize(): void;
    }
}
