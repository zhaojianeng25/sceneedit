module xyz {

    import Rectangle = Pan3d.Rectangle
    import Matrix3D = Pan3d.Matrix3D
    import SceneManager = Pan3d.SceneManager
    export class TooMathMoveUint     {
        public static MOVE_XYZ: number = 0
        public static MOVE_SCALE: number = 1
        public static MOVE_ROUTATION: number = 2	


        /**
		 * 
		 * @param $v3d 传入一个世界坐标，
		 * @return  返回一个屏幕顶点坐标
		 * 
		 */
        public static   mathWorld3DPosto2DView( $v3d: Vector3D, scene: SceneManager): Vector2D {
       
            var _posMatrix: Matrix3D = new Matrix3D
            _posMatrix.appendTranslation($v3d.x, $v3d.y, $v3d.z);
            _posMatrix.append(scene.cam3D.cameraMatrix);
            _posMatrix.append(scene.viewMatrx3D);
            var v3d: Vector3D = _posMatrix.transformVector(new Vector3D);
            v3d.x = v3d.x / v3d.w;
            v3d.y = v3d.y / v3d.w;

            var sw: number = scene.cam3D.cavanRect.width
            var sh: number = scene.cam3D.cavanRect.height

            v3d.x = (1 + v3d.x) * sw / 2;
            v3d.y = (1 - v3d.y) * sh / 2;
            return new Vector2D(v3d.x, v3d.y);


        }
    }
}