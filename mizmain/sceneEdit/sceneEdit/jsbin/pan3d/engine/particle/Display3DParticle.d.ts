declare module Pan3d {
    class Display3DParticle extends Object3D {
        visible: boolean;
        timeline: TimeLine;
        protected _time: number;
        private _beginTime;
        data: ParticleData;
        bindMatrix: Matrix3D;
        bindVecter3d: Vector3D;
        bindScale: Vector3D;
        invertBindMatrix: Matrix3D;
        groupMatrix: Matrix3D;
        protected _rotationMatrix: Matrix3D;
        modelMatrix: Matrix3D;
        isInGroup: boolean;
        groupPos: Vector3D;
        groupScale: Vector3D;
        groupRotation: Vector3D;
        constructor();
        onCreated(): void;
        setBind($pos: Vector3D, $rotation: Matrix3D, $scale: Vector3D, $invertRotation: Matrix3D, $groupMatrix: Matrix3D): void;
        getMulBindList(): Array<Vector3D>;
        updateMatrix(): void;
        private readonly cantUseEffectsLev;
        updateTime(t: number): void;
        reset(): void;
        clearAllAnim(): void;
        update(): void;
        setVc(): void;
        pushVc(): void;
        setVa(): void;
        resetVa(): void;
        setMaterialVc(): void;
        setMaterialTexture(): void;
        inverBind(): void;
        resetPos(): void;
        resetMulPos(ary: Array<Array<Array<number>>>): void;
        getVector3DByObject(obj: any): Vector3D;
        clone(): Display3DParticle;
        setAllByteInfo($byte: Pan3dByteArray, version?: number): void;
        creatData(): void;
        setTimeLine($tl: TimeLine): void;
        destory(): void;
    }
}
