declare module Pan3d.me {
    class MaterialBatchAnimShader extends Shader3D {
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
