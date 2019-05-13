declare module materialui {
    import Vector3D = Pan3d.me.Vector3D;
    class NodeTreeNormal extends NodeTree {
        constVec3: Vector3D;
        constructor();
        getComponentID($id: number): string;
    }
}
