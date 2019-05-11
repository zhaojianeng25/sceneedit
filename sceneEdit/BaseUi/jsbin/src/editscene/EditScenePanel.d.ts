declare module editscene {
    import Panel = win.Panel;
    import UIConatiner = Pan3d.me.UIConatiner;
    class CentenPanel extends Panel {
        addUIContainer($container: UIConatiner): void;
        removeUIContainer($container: UIConatiner): void;
    }
    class MainRightPanel extends win.BaseWindow {
        constructor();
    }
    class EditScenePanel extends Panel {
        constructor();
        showofHide(panel: Panel): void;
        private _sceneLaoutLinePane;
        private addSceneLaoutLinePane;
        private addCenten;
        private addRight;
        private addTop;
        private addLeft;
    }
}
