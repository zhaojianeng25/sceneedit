declare module prop {
    class InputFunTextUi extends BaseMeshUi {
        constructor(w?: number, h?: number);
        protected initView(): void;
        destory(): void;
        private chatHtmlIArea;
        private makeHtmlArear;
        private changeInputTxt;
        resize(): void;
        width: number;
        height: number;
        text: string;
        protected drawUrlImgToUi(ui: Pan3d.UICompenent, url: string): void;
        protected drawImgToUi(ui: Pan3d.UICompenent, $img: any): void;
    }
}
