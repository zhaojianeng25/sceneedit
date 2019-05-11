declare module cctv {
    import Shader3D = Pan3d.me.Shader3D;
    import Display3D = Pan3d.me.Display3D;
    class TooJianTouDisplay3DShader extends Shader3D {
        static TooJianTouDisplay3DShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class TooRotationDisplay3DSprite extends Display3D {
        constructor();
        protected initData(): void;
        private mathRoundTri;
        upToGpu(): void;
        colorVect: Vector3D;
        update(): void;
    }
}
