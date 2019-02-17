module xyz {

    import ObjData = Pan3d.ObjData;
    import Camera3D = Pan3d.Camera3D;
    import Vector2D = Pan3d.Vector2D;
    import Matrix3D = Pan3d.Matrix3D;
    import Rectangle = Pan3d.Rectangle
    import TestTriangle = Pan3d.TestTriangle
    import Display3D = Pan3d.Display3D
    import Engine = Pan3d.Engine
 
    export class TooMathHitModel {

        private static getViewMatrx3D(cam: Camera3D): Matrix3D {
            var viewMatrx3D: Matrix3D = new Matrix3D


            viewMatrx3D.perspectiveFieldOfViewLH(Engine.sceneCamScale, 1, 1, 1000);
            viewMatrx3D.appendScale(1, cam.cavanRect.width / cam.cavanRect.height, 1);

            return viewMatrx3D

        }
        public static testHitModel(display3D: Display3D, cam: Camera3D, mouse: Vector2D): boolean {
            if (!display3D || !display3D.objData) {
                return false;
            }
            var objData: ObjData = display3D.objData

            var mat: Matrix3D = cam.cameraMatrix.clone();
            var viewMatrx3D: Matrix3D = this.getViewMatrx3D(cam);
            mat.append(viewMatrx3D);

            for (var i: number = 0; i < objData.indexs.length/3; i++) {
 
                var a: number = objData.indexs[i * 3 + 0]
                var b: number = objData.indexs[i * 3 + 1]
                var c: number = objData.indexs[i * 3 + 2]


                var A: Vector3D = new Vector3D(objData.vertices[a * 3 + 0], objData.vertices[a * 3 + 1], objData.vertices[a * 3 + 2])
                var B: Vector3D = new Vector3D(objData.vertices[b * 3 + 0], objData.vertices[b * 3 + 1], objData.vertices[b * 3 + 2])
                var C: Vector3D = new Vector3D(objData.vertices[c * 3 + 0], objData.vertices[c * 3 + 1], objData.vertices[c * 3 + 2])
                if (Vector3D.distance(A, B) == 0 || Vector3D.distance(A, C) == 0 || Vector3D.distance(B, C) == 0) {
                    continue;
                }
                A = display3D.posMatrix.transformVector(A);
                B = display3D.posMatrix.transformVector(B);
                C = display3D.posMatrix.transformVector(C);

               

                TestTriangle.baseTri.p1 = this.math3DWorldtoDisplay2DPos(A, mat, cam.cavanRect);
                TestTriangle.baseTri.p2 = this.math3DWorldtoDisplay2DPos(B, mat, cam.cavanRect);
                TestTriangle.baseTri.p3 = this.math3DWorldtoDisplay2DPos(C, mat, cam.cavanRect);

                if (TestTriangle.baseTri.checkPointIn(mouse)) {

               
                    return true;
                }
            }
            return false
        }
        private static math3DWorldtoDisplay2DPos($pos: Vector3D, mat: Matrix3D, rect: Rectangle): Vector2D {
            var m: Matrix3D = mat;
            var fovw: number = rect.width
            var fovh: number = rect.height
            var p: Vector3D = m.transformVector($pos);
            var b: Vector2D = new Vector2D;
            b.x = ((p.x / p.w) + 1) * (fovw / 2)
            b.y = ((-p.y / p.w) + 1) * (fovh / 2)
            return b;
        }
    }
}