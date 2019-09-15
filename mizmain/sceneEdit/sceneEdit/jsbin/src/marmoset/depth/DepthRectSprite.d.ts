declare module depth {
    import Shader3D = Pan3d.Shader3D;
    import Display3D = Pan3d.Display3D;
    import TextureRes = Pan3d.TextureRes;
    class DepthRectShader extends Shader3D {
        static DepthRectShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class DepthRectSprite extends Display3D {
        constructor();
        protected initData(): void;
        private loadTexture;
        _uvTextureRes: TextureRes;
        upToGpu(): void;
        private skipNum;
        update(): void;
    }
}
