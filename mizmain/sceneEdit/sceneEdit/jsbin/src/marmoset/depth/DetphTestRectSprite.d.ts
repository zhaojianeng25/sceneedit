declare module depth {
    import Shader3D = Pan3d.Shader3D;
    import Display3D = Pan3d.Display3D;
    import TextureRes = Pan3d.TextureRes;
    class DetphTestRectShader extends Shader3D {
        static DetphTestRectShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class DetphTestRectSprite extends Display3D {
        constructor();
        protected initData(): void;
        private loadTexture;
        _uvTextureRes: TextureRes;
        upToGpu(): void;
        private baseNum;
        update(): void;
    }
}
