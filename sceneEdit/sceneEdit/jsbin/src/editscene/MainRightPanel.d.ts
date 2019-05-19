declare module editscene {
    import UICompenent = Pan3d.UICompenent;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import Disp2DBaseText = Pan3d.Disp2DBaseText;
    import Panel = win.Panel;
    class RightTabInfoVo {
        type: number;
        label: string;
        class: any;
    }
    class RightTabText extends Disp2DBaseText {
        bgUi: UICompenent;
        textMetrics: TextMetrics;
        rightTabInfoVo: RightTabInfoVo;
        select: boolean;
        private _select;
        makeData(): void;
    }
    class RightOpenList {
        private perent;
        private topRender;
        constructor(value: MainRightBaseWin, render: UIRenderComponent);
        private tabItemArr;
        private tabBgClik;
        removePathUrl(value: RightTabInfoVo): void;
        changeVoBg(vo: RightTabText, value: boolean): void;
        private refrishTabUiSelect;
        pushPathUrl(value: RightTabInfoVo): void;
        private selectTabStr;
    }
    class MainRightBaseWin extends win.Dis2dBaseWindow {
        constructor();
        private e_file_list_path_bg;
        protected loadConfigCom(): void;
        private skilNum;
        showNextView(value: any): void;
        private getTempTabInfo;
        private rightOpenList;
        resize(): void;
    }
    class MainRightPanel extends Panel {
        protected winBg: MainRightBaseWin;
        constructor(has?: boolean);
        readonly mainRightBaseWin: MainRightBaseWin;
        changeSize(): void;
    }
}
