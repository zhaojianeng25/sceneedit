declare module drag {
    import UICompenent = Pan3d.me.UICompenent;
    import UIConatiner = Pan3d.me.UIConatiner;
    class DragPanel extends UIConatiner {
        private _bRender;
        private tempUiName;
        ui: UICompenent;
        constructor(w: number, h: number);
        setData(value: DragSource): void;
    }
}
