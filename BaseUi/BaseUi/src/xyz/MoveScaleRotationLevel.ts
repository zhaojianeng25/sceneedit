module xyz {
    import Display3D = Pan3d.Display3D
    import Matrix3D = Pan3d.Matrix3D
    import MathUtil = Pan3d.MathUtil
    import BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite
    export class MoveScaleRotationLevel extends Display3D {
        private _tooMoveLevel: TooMoveLevel;
        private _statceType: number;
        public constructor() {
            super();
            this._statceType = TooMathMoveUint.MOVE_XYZ
            this._tooMoveLevel = new TooMoveLevel;
            this._tooMoveLevel.parent = this;
        }
        public update(): void {

            if (this._xyzMoveData) {
                this._xyzMoveData.modeMatrx3D.identity()
                this._xyzMoveData.modeMatrx3D.appendScale(this._xyzMoveData.scaleX, this._xyzMoveData.scaleY, this._xyzMoveData.scaleY);
                this._xyzMoveData.modeMatrx3D.appendRotation(this._xyzMoveData.rotationX, Vector3D.X_AXIS);
                this._xyzMoveData.modeMatrx3D.appendRotation(this._xyzMoveData.rotationY, Vector3D.Y_AXIS);
                this._xyzMoveData.modeMatrx3D.appendRotation(this._xyzMoveData.rotationZ, Vector3D.Z_AXIS);
                this._xyzMoveData.modeMatrx3D.appendTranslation(this._xyzMoveData.x, this._xyzMoveData.y, this._xyzMoveData.z)
            }


            this._tooMoveLevel.update()

        }
        public addStage(): void {
            super.addStage()
            this._tooMoveLevel._scene = this._scene;
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
                return
            }
            this._xyzMoveData.dataUpDate = this.dataUpDate;
            this._xyzMoveData.modeMatrx3D = new Matrix3D;

            this._xyzMoveData.modeMatrx3D.identity()
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
                    default:
                        break
                }
            } else {
                if ($e.buttons == 1) {
                    switch (this._statceType) {
                        case TooMathMoveUint.MOVE_XYZ:
                            this._tooMoveLevel.onMouseMove(mouseVect2d)
                            break
                        default:
                            break
                    }

                }
            }
           
        }
        public onMouseUp($e: MouseEvent): void {
            var mouseVect2d: Vector2D = new Vector2D($e.x - this._scene.cam3D.cavanRect.x, $e.y - this._scene.cam3D.cavanRect.y)
            switch (this._statceType) {
                case TooMathMoveUint.MOVE_XYZ:
                    this._tooMoveLevel.onMouseUp(mouseVect2d)
                    break
                default:
                    break
            }
        }
        public onMouseDown($e: MouseEvent): void {
            
            var mouseVect2d: Vector2D = new Vector2D($e.x - this._scene.cam3D.cavanRect.x, $e.y - this._scene.cam3D.cavanRect.y)

            if ($e.button == 0) {
                switch (this._statceType) {
                    case TooMathMoveUint.MOVE_XYZ:
                        this._tooMoveLevel.onMouseDown(mouseVect2d)
                        //TooMathHitModel.getMouseMoveV3d(this._scene, mouseVect2d);
                        //TooMathHitModel.getCamFontDistent(this._scene, mouseVect2d,100)
                      
 
                        break
                    default:
                        break
                }
            }

        }

    }

}



