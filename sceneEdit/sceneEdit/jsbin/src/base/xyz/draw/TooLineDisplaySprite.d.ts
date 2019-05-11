declare module xyz {
    import Display3D = Pan3d.me.Display3D;
    import Vector3D = Pan3d.me.Vector3D;
    class TooLineDisplaySprite extends Display3D {
        constructor();
        lineVecPos: Array<number>;
        lineColor: Array<number>;
        lineIndex: Array<number>;
        baseColor: Vector3D;
        makeLineMode(a: Vector3D, b: Vector3D, $color?: Vector3D): void;
        clear(): void;
        upToGpu(): void;
        update(): void;
    }
}
