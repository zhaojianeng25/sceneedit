
module LayaPan3D {



    import Vector2D = Pan3d.Vector2D
    import Object3D = Pan3d.Object3D
    import Matrix3D = Pan3d.Matrix3D
 


    export class LayaScene2dSceneChar extends layapan.LayaSceneChar {

        public set2dPos($x: number, $y: number): void {

            var $nScale: number = 1;
            var $num45: number = 45;
            if (this._scene) {
                //如果需要重置有场景的情况下在2D的坐标才会正确
                $nScale = 2 / this._scene.cam3D.scene2dScale;
                $num45 = Math.abs(this._scene.focus3D.rotationX);
            }
            var $tx: number = $x * $nScale;
            var $tz: number = $y * $nScale / (Math.sin($num45 * Math.PI / 180)) * -1;
            this._px = $tx;
            this._pz = $tz;
            this.x = $tx;
            this.z = $tz;
        }
  
    }
 
    export class LayaScene2D extends Laya3dSprite {
        public constructor(value: string, bfun: Function = null) { //"res/ui/icon/512.jpg"
            super(value, bfun)
            this.addEvents()
        }
        protected addSceneModel(): void {
            this.sceneManager.cam3D.scene2dScale = 4

            var $baseChar: LayaScene2dSceneChar = new LayaScene2dSceneChar();
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            this.sceneManager.addMovieDisplay($baseChar);
            $baseChar.set2dPos(100, 100)
            this.mainChar = $baseChar
 
        }
        private mainChar: LayaScene2dSceneChar
        protected addEvents(): void {
            this.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
            this.on(Pan3d.MouseType.MouseWheel, this, this.onMouseWheel);
 
        }

        private onMouseWheel(e: any): void {
            this.sceneManager.cam3D.scene2dScale += e.delta / 100;
        }
 
        private dragRegion: Laya.Rectangle;
        private onStartDrag(e: Event): void {
            if (this.mouseY < this.height * 0.2) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            } else {
                this.mainChar.set2dPos(this.mouseX * this.scaleX, this.mouseY * this.scaleY)
            }
        }
        private get scene2dScale(): number {
            return this.sceneManager.cam3D.scene2dScale
        }
 
    

        public upData(): void {
            if (this.sceneManager) {
                this.sceneManager.focus3D.rotationX = -45;
                this.sceneManager.focus3D.rotationY = 0;

                var tw: number = this.sceneManager.cam3D.cavanRect.width
                var th: number = this.sceneManager.cam3D.cavanRect.height
                this.sceneManager.focus3D.x = tw / this.scene2dScale;
                var $num45: number = Math.abs(this.sceneManager.focus3D.rotationX);//45度角
                this.sceneManager.focus3D.z = (th / this.scene2dScale) / (Math.sin($num45 * Math.PI / 180)) * -1;
                Pan3d.MathClass.getCamView(this.sceneManager.cam3D, this.sceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                super.upData()
            }
        }
    
        protected renderToTexture(): void {
            var m: Matrix3D = new Matrix3D
            var tw: number = this.sceneManager.cam3D.cavanRect.width
            var th: number = this.sceneManager.cam3D.cavanRect.height
            m.appendScale(1 / tw, 1 / th, 1 / 2000);
            m.appendScale(this.scene2dScale, this.scene2dScale, 1);
            this.sceneManager.renderToTexture(m);

        }

    }
}