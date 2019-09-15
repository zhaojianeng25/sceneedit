declare module Pan3d {
    class ObjectMath {
        a: number;
        b: number;
        c: number;
        d: number;
    }
    class Calculation {
        constructor();
        static _PanelEquationFromThreePt(p1: Vector3D, p2: Vector3D, p3: Vector3D): ObjectMath;
        static calPlaneLineIntersectPoint(planeVector: Vector3D, planePoint: Vector3D, linePointA: Vector3D, linePointB: Vector3D): Vector3D;
    }
}
