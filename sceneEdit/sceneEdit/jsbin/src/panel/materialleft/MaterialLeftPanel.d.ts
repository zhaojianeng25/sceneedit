declare module materialleft {
    import InteractiveEvent = Pan3d.me.InteractiveEvent;
    import UIRenderOnlyPicComponent = Pan3d.me.UIRenderOnlyPicComponent;
    import Shader3D = Pan3d.me.Shader3D;
    class BloomUiShader extends Shader3D {
        static BloomUiShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class modelShowRender extends UIRenderOnlyPicComponent {
        constructor();
        protected uiProLocation: WebGLUniformLocation;
        protected ui2ProLocation: WebGLUniformLocation;
        protected initData(): void;
        makeRenderDataVc($vcId: number): void;
        update(): void;
    }
    class MaterialLeftPanel extends win.BaseWindow {
        only: boolean;
        constructor();
        propPanle: prop.UiMeshSprite;
        private metriSpriteMesh;
        private addPojectView;
        private _materialTree;
        materialTree: materialui.MaterialTree;
        protected loadConfigCom(): void;
        protected butClik(evt: InteractiveEvent): void;
        private modelPic;
        private showModelPicUI;
        private initView;
        onMouseWheel($evt: MouseWheelEvent): void;
        protected tittleMouseDown(evt: InteractiveEvent): void;
        protected mouseOnTittleMove(evt: InteractiveEvent): void;
        resize(): void;
        private _inputHtmlSprite;
        protected selectInputDae(evt: InteractiveEvent): void;
        private changeFile;
        private isRoleFile;
    }
}
