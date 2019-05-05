declare module maineditor {
    import Rectangle = Pan3d.me.Rectangle;
    import InteractiveEvent = Pan3d.me.InteractiveEvent;
    class MainEditorPanel extends win.BaseWindow {
        constructor();
        sceneProjectVo: SceneProjectVo;
        private _sceneViewRender;
        protected loadConfigCom(): void;
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
