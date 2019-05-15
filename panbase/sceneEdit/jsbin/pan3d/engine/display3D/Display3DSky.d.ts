declare module Pan3d.me {
    class Display3DSky extends Display3D {
        objurl: string;
        cubeTextList: Array<WebGLTexture>;
        constructor();
        setObjUrl(value: string): void;
        setCubeUrl(value: string): void;
        update(): void;
    }
}
