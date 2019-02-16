module xyz {
    import Display3D = Pan3d.Display3D
    import BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite
    export class MoveScaleRotationLevel extends Display3D {
        private _tooMoveLevel: TooMoveLevel;
        private _statceType: number;
        public constructor() {
            super();
            this._statceType = TooMathMoveUint.MOVE_XYZ
            this._tooMoveLevel = new TooMoveLevel
        }
        public update(): void {
            this._tooMoveLevel.update()

        }
        public addStage(): void {
            super.addStage()
            this._tooMoveLevel._scene = this._scene;
        }
        public onMouseMove($e: MouseEvent): void {

            if ($e.buttons == 0) {
                switch (this._statceType) {
                    case TooMathMoveUint.MOVE_XYZ:
                        this._tooMoveLevel.isHit($e)
                        break
                    default:
                        break
                }
            }
        }

    }

}



