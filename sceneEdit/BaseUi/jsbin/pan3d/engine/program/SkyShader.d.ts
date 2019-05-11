declare module Pan3d.me {
    class SkyShader extends Shader3D {
        static Sky_Shader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
