module LayaPan3D {
    import Vector3D = Pan3d.me.Vector3D
    import Vector2D = Pan3d.me.Vector2D
    import Scene_data = Pan3d.me.Scene_data;

    import CombineParticle = Pan3d.me.CombineParticle
    export class LayaGame2dDemo extends LayaScene2D {
        public constructor(value: string, bfun: Function = null) { //"res/ui/icon/512.jpg"
            super(value, bfun)
        }
        protected initScene(): void {
            super.initScene();
            this.addEvents();
            this.addSceneModel();
            this.bgColor = new Vector3D(0.1,0.1,0.1,1)
        }
    
        private mainChar: LayaScene2dSceneChar
        private addSceneModel(): void {
            this.sceneManager.cam3D.scene2dScale = 10
            var $baseChar: LayaScene2dSceneChar = new LayaScene2dSceneChar();
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            this.sceneManager.addMovieDisplay($baseChar);
            $baseChar.set2dPos(100, 100);
            $baseChar.rotationY=180
            this.mainChar = $baseChar;
            var rect100: Pan3d.me.Rectangle = new Pan3d.me.Rectangle(0, 0, 200, 200);
            for (var i: number = 0; i < 6; i++) {
                for (var j: number = 0; j < 4; j++) {
                    if (i == j) {
                        this.addGrouandPic("map/5/maps/" + j + "_" + i + ".jpg", new Pan3d.me.Rectangle(i * rect100.width, j * rect100.height, rect100.width, rect100.height));
                    }
                }
            }
        }
        private isShowBase: boolean
        private addFramePartice(): void {

            var pathname: string = "pan/atlas"
            var effictname: string ="10101_1"
            var info: any = {}
            info.timeLen = 1000
            info.frameScale =0.1
            info.loop = false
            info.isShow = this.isShowBase
            var combineParticle: CombineParticle = layapan.me.Frame3DAtlasParticle.getFrameParticle(Scene_data.fileRoot + pathname + "/", effictname, info)
            this.sceneManager.particleManager.addParticle(combineParticle);
            var povsto: Vector2D = new Vector2D(100, 200)
            var povsto: Vector2D = new Vector2D(0, 0)
            var $nScale: number =1
            var $tx: number = povsto.x * $nScale;
            var $tz: number = povsto.y * $nScale / (Math.sin(45 * Math.PI / 180)) * -1;
            combineParticle.x = $tx;
            combineParticle.y = 0;
            combineParticle.z = $tz;


        }
        public addGrouandPic(value: string, rect: Pan3d.me.Rectangle): LayaScene2dPicSprit {
            var tempPic: LayaScene2dPicSprit = new LayaScene2dPicSprit(value);
            tempPic.set2dPos(rect.x, rect.y);
            tempPic.width = rect.width;
            tempPic.height = rect.height;
            this.sceneManager.addDisplay(tempPic);
            return tempPic
        }
        protected addEvents(): void {
            this.on(Pan3d.me.MouseType.MouseDown, this, this.onStartDrag);
            this.on(Pan3d.me.MouseType.MouseWheel, this, this.onMouseWheel);
            this.rootpos = new Vector2D(-100,-100)
        }
        public upData(): void {
            super.upData()
          
        }
        private onMouseWheel(e: any): void {
            if (!this.rootpos) {
                this.rootpos = new Vector2D()
            }
            this.rootpos.x += e.delta;
            this.rootpos.y += e.delta;

            console.log(this.rootpos)
        }
        private dragRegion: Laya.Rectangle;
        private onStartDrag(e: Event): void {

            this.addFramePartice()
            if (this.mouseY < this.height * 0.2) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            } else {
                var v2d: Vector2D = this.getMousePos(this.mouseX, this.mouseY);

                console.log("mouseX----", this.mouseX, "mouseY", this.mouseY, "mouseDown", v2d)
                this.mainChar.set2dPos(v2d.x, v2d.y);
            }
        }

    }
}