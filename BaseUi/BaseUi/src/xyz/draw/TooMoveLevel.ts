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


    export class TooMoveLevel extends TooBaseModelLevel {
        private _boxA: TooJianTouDisplay3DSprite;
        private _boxB: TooJianTouDisplay3DSprite;
        private _boxC: TooJianTouDisplay3DSprite;
        private _lineA: TooLineTri3DSprite
        private _lineB: TooLineTri3DSprite
        private _lineC: TooLineTri3DSprite
 
        constructor(value: MoveScaleRotationLevel) {
            super(value);
            
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
        public isHit(mouseVect2d: Vector2D): void {

      
            this.testHitTemp(this._boxA, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(1, 0, 0)]);
            this.testHitTemp(this._boxB, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(0, 1, 0)]);
            this.testHitTemp(this._boxC, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(0, 0, 1)]);

        
        }
 

     

        public onMouseDown(mouseVect2d: Vector2D): void {

            if (TooMathHitModel.testHitModel(this._boxA, this._scene, mouseVect2d)) {
                this.selectId = 1;
            } else if (TooMathHitModel.testHitModel(this._boxB, this._scene, mouseVect2d)) {
                this.selectId = 2;
            } else if (TooMathHitModel.testHitModel(this._boxC, this._scene, mouseVect2d)) {
                this.selectId = 3;
            }
        
        }
        public onMouseUp(mouseVect2d: Vector2D): void {
            this.lastMousePosV3d = null;
            this.selectId = 0;
        }
        private lastMousePosV3d: Vector3D;
        public onMouseMove(mouseVect2d: Vector2D): void {
            if (this.selectId > 0) {
                var pos: Vector3D = TooMathHitModel.getCamFontDistent(this._scene, mouseVect2d, 100);
                if (this.lastMousePosV3d) {
                    var addPos: Vector3D = pos.subtract(this.lastMousePosV3d);
                    var toPos: Vector3D = new Vector3D
                    if (this.parent.xyzMoveData) {
                        switch (this.selectId) {
                            case 1:
                                toPos.x = addPos.x
                                break
                            case 2:
                                toPos.y = addPos.y
                                break
                            case 3:
                                toPos.z = addPos.z
                                break
                            default:
                                break;
                        }
                        toPos=  this.parent.xyzMoveData.modeMatrx3D.transformVector(toPos)

                        this.parent.xyzMoveData.x = toPos.x;
                        this.parent.xyzMoveData.y = toPos.y;
                        this.parent.xyzMoveData.z = toPos.z;
                    }


                }
                this.lastMousePosV3d = pos;
            }
        }
     
        public update(): void {
            super.update()
 
            var line50: number = 20;;
  
            if (this.parent.xyzMoveData) {
                this.posMatrix.append(this.parent.xyzMoveData.modeMatrx3D);
            }
        

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