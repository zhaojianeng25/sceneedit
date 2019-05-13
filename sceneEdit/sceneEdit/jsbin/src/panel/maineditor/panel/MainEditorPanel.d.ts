declare module maineditor {
    import Rectangle = Pan3d.me.Rectangle;
    import UICompenent = Pan3d.me.UICompenent;
    import UIRenderComponent = Pan3d.me.UIRenderComponent;
    import InteractiveEvent = Pan3d.me.InteractiveEvent;
    import Disp2DBaseText = Pan3d.me.Disp2DBaseText;
    class SelectFileListText extends Disp2DBaseText {
        bgUi: UICompenent;
        id: number;
        tittlestr: string;
        select: boolean;
        private _select;
        makeData(): void;
    }
    class EditorOpenList {
        private perent;
        private topRender;
        constructor(value: MainEditorPanel, render: UIRenderComponent);
        private openlist;
        private clear;
        private tabItemArr;
        private tabBgClik;
        selectTabIndex: number;
        private showList;
    }
    class MainEditorPanel extends win.Dis2dBaseWindow {
        constructor();
        sceneProjectVo: SceneProjectVo;
        private _sceneViewRender;
        private e_line_left;
        private e_line_right;
        private e_centen_panel;
        protected loadConfigCom(): void;
        showType: number;
        private a_scene_view;
        private initView;
        protected butClik(evt: InteractiveEvent): void;
        onPanellMouseWheel($evt: MouseWheelEvent): void;
        private dragDrop;
        suffix: string;
        private testSuffix;
        private dragEnter;
        private upFrame;
        resize(): void;
        panelEventChanger(value: Rectangle): void;
        refrishSize(): void;
    }
}
