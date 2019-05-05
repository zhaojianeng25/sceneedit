declare module Pan3d.me {
    class Display3DShadowShader extends Shader3D {
        static Display3DShadowShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
