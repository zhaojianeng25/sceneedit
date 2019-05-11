declare module materialui {
    import Vector2D = Pan3d.me.Vector2D;
    class NodeTreeTexCoord extends NodeTree {
        constValue: Vector2D;
        constructor();
        getComponentID($id: number): string;
    }
}
