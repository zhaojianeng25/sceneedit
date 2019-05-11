interface IShader {
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
    encode($context: WebGLRenderingContext): void;
    binLocation($context: WebGLRenderingContext): void;
}
declare module Pan3d.me {
    class Shader3D extends ResCount implements IShader {
        vertex: string;
        fragment: string;
        name: string;
        program: WebGLProgram;
        vShader: WebGLShader;
        fShader: WebGLShader;
        paramAry: Array<any>;
        private _paramAry;
        localDic: Object;
        constructor();
        encode(): boolean;
        getWebGLUniformLocation($name: string): WebGLUniformLocation;
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
        destory(): void;
    }
}
