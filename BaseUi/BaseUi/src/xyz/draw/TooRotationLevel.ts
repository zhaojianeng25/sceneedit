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
    import TooRotationDisplay3DSprite = cctv.TooRotationDisplay3DSprite


    export class TooRotationLevel extends TooBaseModelLevel {
        private _roundA: TooRotationDisplay3DSprite;
        private _roundB: TooRotationDisplay3DSprite;
        private _roundC: TooRotationDisplay3DSprite;
 

        constructor(value: MoveScaleRotationLevel) {
            super(value);

            this._roundA = new TooRotationDisplay3DSprite();
            this._roundB = new TooRotationDisplay3DSprite();
            this._roundC = new TooRotationDisplay3DSprite();

    

            this._roundA.colorVect = new Vector3D(1, 0, 0);
            this._roundB.colorVect = new Vector3D(0, 1, 0);
            this._roundC.colorVect = new Vector3D(0, 0, 1);


        }
        public isHit(mouseVect2d: Vector2D): void {


            this.testHitTemp(this._roundA, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(1, 0, 0)]);
            this.testHitTemp(this._roundB, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(0, 1, 0)]);
            this.testHitTemp(this._roundC, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(0, 0, 1)]);


        }

        public onMouseDown(mouseVect2d: Vector2D): void {

            if (TooMathHitModel.testHitModel(this._roundA, this._scene, mouseVect2d)) {
                this.selectId = 1;
            } else if (TooMathHitModel.testHitModel(this._roundB, this._scene, mouseVect2d)) {
                this.selectId = 2;
            } else if (TooMathHitModel.testHitModel(this._roundC, this._scene, mouseVect2d)) {
                this.selectId = 3;
            }

      
 
            

        }
        public onMouseUp(mouseVect2d: Vector2D): void {
 
            this.selectId = 0;
            this.skipNum=0
        }

  

        private skipNum: number=0
        public onMouseMove(mouseVect2d: Vector2D): void {
            if (this.selectId > 0) {
                var $m: Matrix3D = new Matrix3D;
                $m.appendRotation(this.parent.xyzMoveData.oldangle_x, Vector3D.X_AXIS)
                $m.appendRotation(this.parent.xyzMoveData.oldangle_y, Vector3D.Y_AXIS)
                $m.appendRotation(this.parent.xyzMoveData.oldangle_z, Vector3D.Z_AXIS)

                var $addM: Matrix3D = new Matrix3D
                var addRotation: number = this.skipNum++;
                switch (this.selectId) {
                    case 1:
                        $addM.appendRotation(addRotation, Vector3D.X_AXIS)
                        break
                    case 2:
                        $addM.appendRotation(addRotation, Vector3D.Y_AXIS)
                        break
                    case 3:
                        $addM.appendRotation(addRotation, Vector3D.Z_AXIS)
                        break;
                    default:
                        break
                }
                $m.prepend($addM)
 
                var dd: Vector3D = $m.toEulerAngles();
                dd.scaleBy(180 / Math.PI)
                this.parent.xyzMoveData.rotationX = dd.x;
                this.parent.xyzMoveData.rotationY = dd.y;
                this.parent.xyzMoveData.rotationZ = dd.z;
            }
        }

        public update(): void {
            super.update()
    
            if (this.parent.xyzMoveData) {
                this.posMatrix.append(this.parent.xyzMoveData.modeMatrx3D);
            }


            this._roundA.posMatrix = this.posMatrix.clone();
 

            this._roundB.posMatrix = this.posMatrix.clone();
            this._roundB.posMatrix.prependRotation(90, Vector3D.Z_AXIS);

            this._roundC.posMatrix = this.posMatrix.clone();
            this._roundC.posMatrix.prependRotation(-90, Vector3D.Y_AXIS);

     
            Scene_data.context3D.renderContext.enable(Scene_data.context3D.renderContext.CULL_FACE);
            Scene_data.context3D.renderContext.cullFace(Scene_data.context3D.renderContext.BACK);

  
            Scene_data.context3D.setWriteDepth(true);
            Scene_data.context3D.setDepthTest(true);


            this._roundA.update();
            this._roundB.update();
            this._roundC.update();
 




        }



    }
}