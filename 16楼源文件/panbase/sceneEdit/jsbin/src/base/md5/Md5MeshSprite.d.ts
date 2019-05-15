declare module md5list {
    import Shader3D = Pan3d.me.Shader3D;
    import Display3DSprite = Pan3d.me.Display3DSprite;
    import MeshData = Pan3d.me.MeshData;
    import TextureRes = Pan3d.me.TextureRes;
    class Md5MeshShader extends Shader3D {
        static Md5MeshShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class Md5MeshSprite extends Display3DSprite {
        private md5shader;
        constructor();
        setMd5BodyUrl($url: string): void;
        private _md5MeshData;
        private loadBodyMesh;
        private md5objData;
        protected loadTexture(): void;
        protected _uvTextureRes: TextureRes;
        private baseShder;
        updateMaterialMesh($mesh: MeshData): void;
        update(): void;
        updateMaterialMeshCopy(): void;
    }
}
