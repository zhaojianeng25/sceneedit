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
                        toPos = this.parent.xyzMoveData.modeMatrx3D.transformVector(toPos)
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