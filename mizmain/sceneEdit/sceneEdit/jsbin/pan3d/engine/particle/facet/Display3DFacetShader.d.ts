declare module Pan3d {
    class Display3DFacetShader extends Shader3D {
        static Display3D_Facet_Shader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        static shader_mat4: {
            viewMatrix3D: number;
            camMatrix3D: number;
            rotationMatrix3D: number;
            posMatrix3D: number;
        };
        static shader_vec4: {
            uvMove: number[];
        };
        getMat4Str(key: string): string;
        getVec4Str(key: string): string;
        static getVcSize(): number;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
