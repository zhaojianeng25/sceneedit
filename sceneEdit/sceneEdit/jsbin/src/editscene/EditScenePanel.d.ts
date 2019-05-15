declare module editscene {
    import Panel = win.Panel;
    import UIConatiner = Pan3d.UIConatiner;
    class CentenPanel extends Panel {
        addUIContainer($container: UIConatiner): void;
    }
    class MainRightBaseWin extends win.BaseWindow {
        protected loadConfigCom(): void;
    }
    class MainRightPanel extends Panel {
        protected winBg: MainRightBaseWin;
        constructor(has?: boolean);
        changeSize(): void;
    }
    class EditScenePanel extends Panel {
        constructor();
        private _sceneLaoutLinePane;
        private addSceneLaoutLinePane;
        private addCenten;
        private addRight;
        private addTop;
        private addLeft;
    }
}
