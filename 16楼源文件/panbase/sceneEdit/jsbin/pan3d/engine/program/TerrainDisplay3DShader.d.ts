declare module Pan3d.me {
    class TerrainDisplay3DShader extends Shader3D {
        static TerrainDisplay3DShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
