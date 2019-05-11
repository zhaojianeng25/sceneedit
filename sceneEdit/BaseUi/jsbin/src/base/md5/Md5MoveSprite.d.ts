declare module md5list {
    import Display3DSprite = Pan3d.me.Display3DSprite;
    import ObjData = Pan3d.me.ObjData;
    import DualQuatFloat32Array = Pan3d.me.DualQuatFloat32Array;
    import Matrix3D = Pan3d.me.Matrix3D;
    import TextureRes = Pan3d.me.TextureRes;
    class Md5MoveSprite extends Display3DSprite {
        private md5shader;
        constructor();
        md5MeshData: Md5MeshData;
        md5objData: ObjData;
        protected loadBodyMesh(): void;
        private bodyUrl;
        private animUrl;
        setMd5url($bodyurl: string, $animurl: string, $picurl?: string): void;
        frameQuestArr: Array<DualQuatFloat32Array>;
        protected loadAnimFrame(): void;
        protected makeDualQuatFloat32Array($frameAry: Array<Matrix3D>): DualQuatFloat32Array;
        protected loadTexture(): void;
        protected uvTextureRes: TextureRes;
        private baseShder;
        update(): void;
        private lastTm;
        private _actionTime;
        updateMaterialMeshCopy(): void;
        private skipNum;
    }
}
