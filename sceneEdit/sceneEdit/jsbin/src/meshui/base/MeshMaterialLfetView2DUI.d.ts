declare module prop {
    import Shader3D = Pan3d.Shader3D;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class LaterDiplay3dShader extends Shader3D {
        static LaterDiplay3dShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class LaterDiplay3dSprite extends left.MaterialModelSprite {
        constructor();
        protected initData(): void;
        outTexture: WebGLTexture;
        update(): void;
    }
    class LaterOtherDiplay3dSprite extends left.MaterialModelSprite {
        update(): void;
    }
    class MeshMaterialLfetView2DUI extends MeshSceneView2DUI {
        private iconItem;
        protected initView(): void;
        protected butClik(evt: InteractiveEvent): void;
        x: number;
        resize(): void;
        destory(): void;
        protected texturePicUiChange($evt: ReflectionEvet): void;
        private defFileUrl;
        private refrishShowMaterialModel;
        private latersceneManager;
        protected initScene(): void;
        private otherSprite;
        private ktvSprite;
        private setZzwUrlToRole;
        protected oneByFrame(): void;
        width: number;
        constructor(value: UiMeshSprite);
        private lastObjUrl;
        private setObjUrlToSprite;
        private modelSprite;
        private roleSprite;
        refreshViewValue(): void;
    }
}
