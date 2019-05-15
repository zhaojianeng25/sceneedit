declare module prop {
    import EventDispatcher = Pan3d.me.EventDispatcher;
    import UICompenent = Pan3d.me.UICompenent;
    import UIConatiner = Pan3d.me.UIConatiner;
    class TextureContext extends UIConatiner {
        private _bRender;
        private tempUiName;
        ui: UICompenent;
        uiViewScale: number;
        constructor(w: number, h: number);
    }
    class BaseMeshUi extends EventDispatcher {
        textureContext: TextureContext;
        ui: UICompenent;
        constructor(w?: number, h?: number);
        visible: boolean;
        private _visible;
        destory(): void;
        protected addEvets(): void;
        protected butClik(evt: InteractiveEvent): void;
        resize(): void;
        private _x;
        private _y;
        x: number;
        y: number;
    }
    import InteractiveEvent = Pan3d.me.InteractiveEvent;
    class TextLabelUI extends BaseMeshUi {
        constructor(w?: number, h?: number);
        protected initView(): void;
        label: string;
    }
}
