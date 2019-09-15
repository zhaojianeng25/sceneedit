declare module Pan3d {
    class Matrix3D {
        m: Float32Array;
        isIdentity: boolean;
        constructor();
        static tempM: Matrix3D;
        clone($target?: Matrix3D): Matrix3D;
        readonly position: Vector3D;
        copyTo($target: Matrix3D): void;
        identity(): void;
        invert(): void;
        invertToMatrix($target: Matrix3D): void;
        appendTranslation(x: number, y: number, z: number): void;
        prependTranslation(x: number, y: number, z: number): void;
        transformVector($p: Vector3D): Vector3D;
        append($matrx3d: Matrix3D): void;
        prepend($matrx3d: Matrix3D): void;
        appendRotation(rad: number, axis: Vector3D): void;
        tomat3(): Float32Array;
        getRotaionM33(b: Float32Array): void;
        identityScale(): void;
        identityPostion(): void;
        readonly x: number;
        readonly y: number;
        readonly z: number;
        prependRotation(rad: number, axis: Vector3D): Float32Array;
        prependScale(x: number, y: number, z: number): Float32Array;
        appendScale(x: number, y: number, z: number): void;
        perspectiveFieldOfViewLH(fieldOfViewY: number, aspectRatio: number, zNear: number, zFar: number): void;
        fromVtoV($basePos: Vector3D, $newPos: Vector3D): void;
        buildLookAtLH(eyePos: Vector3D, lookAt: Vector3D, up: Vector3D): void;
        static mul(a: any, b: any, c: any): any;
        toEulerAngles(): Vector3D;
        getRotationing(): Vector3D;
        getScaling(): Vector3D;
    }
}
