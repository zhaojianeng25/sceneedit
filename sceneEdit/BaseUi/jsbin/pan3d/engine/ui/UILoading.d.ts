declare module Pan3d.me {
    class UILoading extends UIConatiner {
        private static _instance;
        static getInstance(): UILoading;
        constructor();
        private _ui;
        private atls;
        private _render;
        initData(): void;
        private loadCom;
        show(): void;
        hide(): void;
    }
}
