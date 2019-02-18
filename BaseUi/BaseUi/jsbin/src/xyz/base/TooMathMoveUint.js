var xyz;
(function (xyz) {
    var Matrix3D = Pan3d.Matrix3D;
    var TooMathMoveUint = /** @class */ (function () {
        function TooMathMoveUint() {
        }
        /**
         *
         * @param $v3d 传入一个世界坐标，
         * @return  返回一个屏幕顶点坐标
         *
         */
        TooMathMoveUint.mathWorld3DPosto2DView = function ($v3d, scene) {
            var _posMatrix = new Matrix3D;
            _posMatrix.appendTranslation($v3d.x, $v3d.y, $v3d.z);
            _posMatrix.append(scene.cam3D.cameraMatrix);
            _posMatrix.append(scene.viewMatrx3D);
            var v3d = _posMatrix.transformVector(new Vector3D);
            v3d.x = v3d.x / v3d.w;
            v3d.y = v3d.y / v3d.w;
            var sw = scene.cam3D.cavanRect.width;
            var sh = scene.cam3D.cavanRect.height;
            v3d.x = (1 + v3d.x) * sw / 2;
            v3d.y = (1 - v3d.y) * sh / 2;
            return new Vector2D(v3d.x, v3d.y);
        };
        TooMathMoveUint.MOVE_XYZ = 0;
        TooMathMoveUint.MOVE_SCALE = 1;
        TooMathMoveUint.MOVE_ROUTATION = 2;
        return TooMathMoveUint;
    }());
    xyz.TooMathMoveUint = TooMathMoveUint;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooMathMoveUint.js.map