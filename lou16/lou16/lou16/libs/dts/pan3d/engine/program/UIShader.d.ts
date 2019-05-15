declare module Pan3d.me {
    class UIShader extends Shader3D {
        static UI_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
