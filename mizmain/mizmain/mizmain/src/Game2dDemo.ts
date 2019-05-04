module base {
    import Vector2D = Pan3d.me.Vector2D
    import Rectangle = Pan3d.me.Rectangle
    import MouseType = Pan3d.me.MouseType
    

    import LayaScene2dPicSprit = LayaPan3D.LayaScene2dPicSprit;
    import LayaScene2dSceneChar = LayaPan3D.LayaScene2dSceneChar;

    import LayaScene2D = LayaPan3D.LayaScene2D;
    

    export class Game2dDemo extends LayaScene2D {
        public constructor(value: string, bfun: Function = null) { //"res/ui/icon/512.jpg"
            super(value, bfun)
        }
        protected initScene(): void {
            super.initScene();
            this.addEvents();
            this.addSceneModel();

        }
        private mainChar: LayaScene2dSceneChar
        private addSceneModel(): void {
            this.sceneManager.cam3D.scene2dScale = 1 + Math.random() * 5
            var $baseChar: LayaScene2dSceneChar = new LayaScene2dSceneChar();
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            this.sceneManager.addMovieDisplay($baseChar);
            $baseChar.set2dPos(200, 200);
            $baseChar.rotationY = 180;
            this.mainChar = $baseChar;
            var rect100: Pan3d.me.Rectangle = new Pan3d.me.Rectangle(0, 0, 100, 100);
            for (var i: number = 0; i < 6; i++) {
                for (var j: number = 0; j < 4; j++) {
                     this.addGrouandPic("map/5/maps/" + j + "_" + i + ".jpg", new Pan3d.me.Rectangle(i * rect100.width, j * rect100.height, rect100.width, rect100.height));
                }
            }
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
            this.on(MouseType.MouseDown, this, this.onStartDrag);
            this.on(MouseType.MouseWheel, this, this.onMouseWheel);
            this.rootpos = new Vector2D(-100, -100)
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