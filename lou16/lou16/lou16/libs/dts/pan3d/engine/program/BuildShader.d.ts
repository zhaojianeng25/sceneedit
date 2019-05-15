declare module Pan3d.me {
    class BuildShader extends Shader3D {
        static buildShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
