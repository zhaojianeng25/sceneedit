declare module prop {
    class MaterialFunContentUI extends BaseReflComponent {
        protected textLabelUI: TextLabelUI;
        protected inputFunTextUi: InputFunTextUi;
        protected initView(): void;
        destory(): void;
        resize(): void;
        data: any;
        refreshViewValue(): void;
        x: number;
        y: number;
        label: string;
    }
}
