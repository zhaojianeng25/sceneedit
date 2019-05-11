module xyz {
    import Shader3D = Pan3d.me.Shader3D
    import Display3D = Pan3d.me.Display3D;
    import ProgrmaManager = Pan3d.me.ProgrmaManager
    import TextureManager = Pan3d.me.TextureManager
    import UIManager = Pan3d.me.UIManager;
    import TextureRes = Pan3d.me.TextureRes;
    import Matrix3D = Pan3d.me.Matrix3D
    import Scene_data = Pan3d.me.Scene_data;
    import LineDisplaySprite = Pan3d.me.LineDisplaySprite


    export class TooBaseModelLevel extends Display3D {
 

        public parent: MoveScaleRotationLevel;

        constructor(value: MoveScaleRotationLevel) {
            super();
            this.parent = value
     

        }
        public isHit(mouseVect2d: Vector2D): void {


        
        }
        public selectId: number;



        public onMouseDown(mouseVect2d: Vector2D): void {

           
        }
        public onMouseUp(mouseVect2d: Vector2D): void {
      
        }
   
        public onMouseMove(mouseVect2d: Vector2D): void {
            
        }
        public testHitTemp(display3D: any, v2d: Vector2D, vec: Array<Vector3D>): void {
            var hit: number = TooMathHitModel.testHitModel(display3D, this._scene, v2d);
            display3D.colorVect = hit ? vec[0] : vec[1];

        }
        public update(): void {
            
            this.posMatrix.identity();
            var dis: number = this.parent.lookLenToFocu / 100;
            this.posMatrix.appendScale(dis, dis, dis);



        }



    }
}