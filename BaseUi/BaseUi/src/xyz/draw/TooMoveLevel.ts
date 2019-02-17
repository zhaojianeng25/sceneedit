module xyz {
    import Shader3D = Pan3d.Shader3D
    import Display3D = Pan3d.Display3D;
    import ProgrmaManager = Pan3d.ProgrmaManager
    import TextureManager = Pan3d.TextureManager
    import UIManager = Pan3d.UIManager;
    import TextureRes = Pan3d.TextureRes;
    import Matrix3D = Pan3d.Matrix3D
    import Scene_data = Pan3d.Scene_data;
    import LineDisplaySprite = Pan3d.LineDisplaySprite


    export class TooMoveLevel extends Display3D {
        private _boxA: TooJianTouDisplay3DSprite;
        private _boxB: TooJianTouDisplay3DSprite;
        private _boxC: TooJianTouDisplay3DSprite;
        private _lineA: TooLineTri3DSprite
        private _lineB: TooLineTri3DSprite
        private _lineC: TooLineTri3DSprite
 

        constructor() {
            super();

            this._boxA = new TooJianTouDisplay3DSprite();
            this._boxB = new TooJianTouDisplay3DSprite();
            this._boxC = new TooJianTouDisplay3DSprite();

            this._lineA = new TooLineTri3DSprite();
            this._lineB = new TooLineTri3DSprite();
            this._lineC = new TooLineTri3DSprite();

            this._boxA.colorVect = new Vector3D(1, 0, 0);
            this._boxB.colorVect = new Vector3D(0, 1, 0);
            this._boxC.colorVect = new Vector3D(0, 0, 1);
 

        }
        public isHit($e: MouseEvent): void {

            var mouseVect2d: Vector2D = new Vector2D($e.x - this._scene.cam3D.cavanRect.x, $e.y - this._scene.cam3D.cavanRect.y)

            this.testHitTemp(this._boxA, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(1, 0, 0)]);
            this.testHitTemp(this._boxB, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(0, 1, 0)]);
            this.testHitTemp(this._boxC, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(0, 0, 1)]);

        
        }
        private testHitTemp(display3D: any, v2d: Vector2D, vec: Array<Vector3D>): void {
            var hit: boolean = TooMathHitModel.testHitModel(display3D, this._scene.cam3D, v2d);
            display3D.colorVect = hit ? vec[0]: vec[1];
            
        }
        public update(): void {
            var $m: Matrix3D
            var line50: number = 20;;

            this.posMatrix.identity()
            var dis: number = Vector3D.distance(this._scene.cam3D.postion, this._scene.focus3D);
            dis = dis / 70;
            this.posMatrix.appendScale(dis, dis, dis);

            this._boxA.posMatrix = this.posMatrix.clone();
            this._boxA.posMatrix.prependTranslation(line50, 0, 0);
         

            this._boxB.posMatrix = this.posMatrix.clone();
            this._boxB.posMatrix.prependTranslation(0, line50, 0);
            this._boxB.posMatrix.prependRotation(90, Vector3D.Z_AXIS);

                ;
            this._boxC.posMatrix = this.posMatrix.clone();
            this._boxC.posMatrix.prependTranslation(0, 0, line50);
            this._boxC.posMatrix.prependRotation(-90, Vector3D.Y_AXIS);

            this._lineA.posMatrix = this.posMatrix.clone();


            this._lineB.posMatrix = this.posMatrix.clone();
            this._lineB.posMatrix.prependRotation(90, Vector3D.Z_AXIS);

            this._lineC.posMatrix = this.posMatrix.clone();
            this._lineC.posMatrix.prependRotation(-90, Vector3D.Y_AXIS);
         


            Scene_data.context3D.cullFaceBack(false);
            Scene_data.context3D.setWriteDepth(true);
            Scene_data.context3D.setDepthTest(true);


            this._boxA.update();
            this._boxB.update();
            this._boxC.update();

            this._lineA.update();
            this._lineB.update();
            this._lineC.update();

      
            

        }



    }
}