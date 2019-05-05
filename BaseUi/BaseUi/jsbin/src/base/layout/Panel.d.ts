declare module win {
    class Panel extends Sprite {
        protected winBg: LayoutbaseBg;
        ishide: boolean;
        layer: number;
        constructor(has?: boolean);
        setShowUi(value: Array<string>): void;
        changeSize(): void;
    }
}
