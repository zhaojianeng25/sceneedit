var xyz;
(function (xyz) {
    var Vector2D = Pan3d.Vector2D;
    var Matrix3D = Pan3d.Matrix3D;
    var TestTriangle = Pan3d.TestTriangle;
    var Engine = Pan3d.Engine;
    var TooMathHitModel = /** @class */ (function () {
        function TooMathHitModel() {
        }
        TooMathHitModel.getViewMatrx3D = function (cam) {
            var viewMatrx3D = new Matrix3D;
            viewMatrx3D.perspectiveFieldOfViewLH(Engine.sceneCamScale, 1, 1, 1000);
            viewMatrx3D.appendScale(1, cam.cavanRect.width / cam.cavanRect.height, 1);
            return viewMatrx3D;
        };
        TooMathHitModel.testHitModel = function (display3D, cam, mouse) {
            if (!display3D || !display3D.objData) {
                return false;
            }
            var objData = display3D.objData;
            var mat = cam.cameraMatrix.clone();
            var viewMatrx3D = this.getViewMatrx3D(cam);
            mat.append(viewMatrx3D);
            for (var i = 0; i < objData.indexs.length / 3; i++) {
                var a = objData.indexs[i * 3 + 0];
                var b = objData.indexs[i * 3 + 1];
                var c = objData.indexs[i * 3 + 2];
                var A = new Vector3D(objData.vertices[a * 3 + 0], objData.vertices[a * 3 + 1], objData.vertices[a * 3 + 2]);
                var B = new Vector3D(objData.vertices[b * 3 + 0], objData.vertices[b * 3 + 1], objData.vertices[b * 3 + 2]);
                var C = new Vector3D(objData.vertices[c * 3 + 0], objData.vertices[c * 3 + 1], objData.vertices[c * 3 + 2]);
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
            return false;
        };
        TooMathHitModel.math3DWorldtoDisplay2DPos = function ($pos, mat, rect) {
            var m = mat;
            var fovw = rect.width;
            var fovh = rect.height;
            var p = m.transformVector($pos);
            var b = new Vector2D;
            b.x = ((p.x / p.w) + 1) * (fovw / 2);
            b.y = ((-p.y / p.w) + 1) * (fovh / 2);
            return b;
        };
        return TooMathHitModel;
    }());
    xyz.TooMathHitModel = TooMathHitModel;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooMathHitModel.js.map