declare module maineditor {
    import Rectangle = Pan3d.me.Rectangle;
    import UIRenderComponent = Pan3d.me.UIRenderComponent;
    import InteractiveEvent = Pan3d.me.InteractiveEvent;
    class EditorOpenList {
        private perent;
        private topRender;
        constructor(value: MainEditorPanel, render: UIRenderComponent);
        private showList;
    }
    class MainEditorPanel extends win.BaseWindow {
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
