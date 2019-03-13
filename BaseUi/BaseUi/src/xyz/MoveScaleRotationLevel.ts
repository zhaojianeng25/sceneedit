module xyz {
    import Display3D = Pan3d.Display3D
    import Matrix3D = Pan3d.Matrix3D
    import MathUtil = Pan3d.MathUtil
    import BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite;
    import UIConatiner = Pan3d.UIConatiner;
    export class MoveScaleRotationLevel extends Display3D {
      
        private _tooMoveLevel: TooMoveLevel;
        private _tooRotationLevel: TooRotationLevel;
        public _statceType: number;
        public constructor() {
            super();
            this._statceType = TooMathMoveUint.MOVE_ROUTATION
            this._tooMoveLevel = new TooMoveLevel(this);
            this._tooRotationLevel = new TooRotationLevel(this);
       
        }
        public lookLenToFocu: number
        public update(): void {

            var focuV3d: Vector3D = new Vector3D
            if (this._xyzMoveData) {
                this._xyzMoveData.modeMatrx3D.identity()
                this._xyzMoveData.modeMatrx3D.appendScale(this._xyzMoveData.scaleX, this._xyzMoveData.scaleY, this._xyzMoveData.scaleY);
                this._xyzMoveData.modeMatrx3D.appendRotation(this._xyzMoveData.rotationX, Vector3D.X_AXIS);
                this._xyzMoveData.modeMatrx3D.appendRotation(this._xyzMoveData.rotationY, Vector3D.Y_AXIS);
                this._xyzMoveData.modeMatrx3D.appendRotation(this._xyzMoveData.rotationZ, Vector3D.Z_AXIS);
                this._xyzMoveData.modeMatrx3D.appendTranslation(this._xyzMoveData.x, this._xyzMoveData.y, this._xyzMoveData.z)

                //console.log(this._xyzMoveData.x, this._xyzMoveData.y, this._xyzMoveData.z)

                this.lookLenToFocu = Vector3D.distance(this._scene.cam3D, this._xyzMoveData);
             
            }
  
            switch (this._statceType) {
                case TooMathMoveUint.MOVE_XYZ:
                    this._tooMoveLevel.update()
                    break
                case TooMathMoveUint.MOVE_ROUTATION:
                    this._tooRotationLevel.update()
                    break
                default:
                    break
            }
       

        }
        public addStage(): void {
            super.addStage()
            this._tooMoveLevel._scene = this._scene;
            this._tooRotationLevel._scene = this._scene;
        }
        public   dataUpDate(): void {
        }
        private _xyzMoveData: TooXyzPosData
        public get xyzMoveData(): TooXyzPosData {
            return this._xyzMoveData ;
        }
        public set xyzMoveData(value: TooXyzPosData) {
            this._xyzMoveData = value;
            if (this._xyzMoveData == null) {
                this._statceType = TooMathMoveUint.MOVE_NULL
                return
            } else {
                this._statceType = TooMathMoveUint.MOVE_XYZ
            }
            this._xyzMoveData.modeMatrx3D = new Matrix3D;
            this._xyzMoveData.modeMatrx3D.appendScale(this._xyzMoveData.scaleX, this._xyzMoveData.scaleY, this._xyzMoveData.scaleY);
            this._xyzMoveData.modeMatrx3D.appendRotation(this._xyzMoveData.rotationX, Vector3D.X_AXIS);
            this._xyzMoveData.modeMatrx3D.appendRotation(this._xyzMoveData.rotationY, Vector3D.Y_AXIS);
            this._xyzMoveData.modeMatrx3D.appendRotation(this._xyzMoveData.rotationZ, Vector3D.Z_AXIS);
            this._xyzMoveData.modeMatrx3D.appendTranslation(this._xyzMoveData.x, this._xyzMoveData.y, this._xyzMoveData.z)
         
 
        }

        public onMouseMove($e: MouseEvent): void {
            var mouseVect2d: Vector2D = new Vector2D($e.x - this._scene.cam3D.cavanRect.x, $e.y - this._scene.cam3D.cavanRect.y)
            if ($e.buttons == 0) {
                switch (this._statceType) {
                    case TooMathMoveUint.MOVE_XYZ:
                        this._tooMoveLevel.isHit(mouseVect2d)
                        break
                    case TooMathMoveUint.MOVE_ROUTATION:
                        this._tooRotationLevel.isHit(mouseVect2d)
                        break
                    default:
                        break
                }
            } else {
                if ($e.buttons == 1) {
                    var needUpData: boolean = false

                    switch (this._statceType) {
                        case TooMathMoveUint.MOVE_XYZ:
                            needUpData=   this._tooMoveLevel.onMouseMove(mouseVect2d)
                            break
                        case TooMathMoveUint.MOVE_ROUTATION:
                            needUpData = this._tooRotationLevel.onMouseMove(mouseVect2d)
                            break
                        default:
               
                            break
                    }
                    if (needUpData) {
                        this.upChange()
                    }
             
           
                }
            }
       
        }
        private upChange(): void {
            if (this.xyzMoveData) {
                for (var i: number = 0; i < this.xyzMoveData.modelItem.length; i++) {
                    var M: Matrix3D = this.xyzMoveData.modeMatrx3D.clone();
                    M.prepend(this.xyzMoveData.dataItem[i].modeMatrx3D);

                    this.xyzMoveData.modelItem[i].x = M.position.x;
                    this.xyzMoveData.modelItem[i].y = M.position.y;
                    this.xyzMoveData.modelItem[i].z = M.position.z;

                    var ro: Vector3D = M.toEulerAngles();
                    this.xyzMoveData.modelItem[i].rotationX = ro.x * 180 / Math.PI;
                    this.xyzMoveData.modelItem[i].rotationY = ro.y * 180 / Math.PI;
                    this.xyzMoveData.modelItem[i].rotationZ = ro.z * 180 / Math.PI;
                }
                this.xyzMoveData.dataUpDate && this.xyzMoveData.dataUpDate();
                console.log("修改位置")
            }
        }
        public onMouseUp($e: MouseEvent): void {
            var mouseVect2d: Vector2D = new Vector2D($e.x - this._scene.cam3D.cavanRect.x, $e.y - this._scene.cam3D.cavanRect.y)
            switch (this._statceType) {
                case TooMathMoveUint.MOVE_XYZ:
                    this._tooMoveLevel.onMouseUp(mouseVect2d)
                    break
                case TooMathMoveUint.MOVE_ROUTATION:
                    this._tooRotationLevel.onMouseUp(mouseVect2d)
                    break
                default:
                    break
            }
        }
        public onMouseDown($e: MouseEvent): void {
            if (!this._xyzMoveData) {
                return
            }

            this._xyzMoveData.oldx = this._xyzMoveData.x
            this._xyzMoveData.oldy = this._xyzMoveData.y
            this._xyzMoveData.oldz = this._xyzMoveData.z
            this._xyzMoveData.oldangle_x = this._xyzMoveData.rotationX;
            this._xyzMoveData.oldangle_y = this._xyzMoveData.rotationY;
            this._xyzMoveData.oldangle_z = this._xyzMoveData.rotationZ;

            var mouseVect2d: Vector2D = new Vector2D($e.x - this._scene.cam3D.cavanRect.x, $e.y - this._scene.cam3D.cavanRect.y)

            if ($e.button == 0) {
                switch (this._statceType) {
                    case TooMathMoveUint.MOVE_XYZ:
                        this._tooMoveLevel.onMouseDown(mouseVect2d)
                        break
                    case TooMathMoveUint.MOVE_ROUTATION:
                        this._tooRotationLevel.onMouseDown(mouseVect2d)
                        break


              
                    default:
                        break
                }
            }

        }

    }

}



