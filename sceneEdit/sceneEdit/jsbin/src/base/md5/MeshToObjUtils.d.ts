declare module md5list {
    import MeshData = Pan3d.me.MeshData;
    import ObjectBone = Pan3d.me.ObjectBone;
    class MeshToObjUtils {
        getObj(mesh: Md5MeshData): MeshData;
        private getW;
        processBoneNew(targetAry: Array<ObjectBone>): Array<ObjectBone>;
        static getStorNewTargerArr(targetAry: Array<ObjectBone>): Array<ObjectBone>;
    }
}
