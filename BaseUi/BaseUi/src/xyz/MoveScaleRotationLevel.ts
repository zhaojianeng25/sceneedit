module xyz {
    import Display3D = Pan3d.Display3D
    import BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite
    export class MoveScaleRotationLevel  extends Display3D {
        private _moveDisplay3DSprite: TooMoveLevel;
        private a: BaseDiplay3dSprite
        public constructor() {
            super();

            this._moveDisplay3DSprite = new TooMoveLevel
            
        }
        public update(): void {
            this._moveDisplay3DSprite.update()
       
        }
        public addStage(): void {
            super.addStage()
            this._moveDisplay3DSprite._scene = this._scene;

        }

    }

}



