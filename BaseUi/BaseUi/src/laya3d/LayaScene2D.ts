
module LayaPan3D {

    import Vector2D = Pan3d.Vector2D
    import Object3D = Pan3d.Object3D
    import MathClass = Pan3d.MathClass
    import Scene_data = Pan3d.Scene_data

    import MaterialRoleSprite = left.MaterialRoleSprite;
    import ModelSprite = maineditor.ModelSprite;
    import SkillSpriteDisplay = maineditor.SkillSpriteDisplay;
    import LyfSpriteDisplay = maineditor.LyfSpriteDisplay;

    import EdItorSceneManager = maineditor.EdItorSceneManager;


    export class LayaScene2D extends Laya3dSprite {
        public constructor(value: string, bfun: Function = null) { //"res/ui/icon/512.jpg"
            super(value, bfun)

            this.addEvents()
        }
        protected addEvents(): void {
            this.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
            this.on(Pan3d.MouseType.MouseWheel, this, this.onMouseWheel);
            Laya.stage.on(Pan3d.MouseType.MouseUp, this, this.onMouseUp);
            Laya.stage.on(Pan3d.MouseType.MouseMove, this, this.onMouseMove);
        }

        private onMouseWheel(e: any): void {
            this.sceneMaager.cam3D.distance += e.delta
        }
        private lastMouseVec2d: Vector2D;
        private lastfocus3D: Object3D
        private dragRegion: Laya.Rectangle;
        private onStartDrag(e: Event): void {
            if (this.mouseY < this.height * 0.2) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            } else {
                this.lastMouseVec2d = new Vector2D(this.mouseX, this.mouseY)
                this.lastfocus3D = new Object3D()
                this.lastfocus3D.rotationY = this.sceneMaager.focus3D.rotationY
                this.lastfocus3D.rotationX = this.sceneMaager.focus3D.rotationX
            }

        }
        private onMouseUp(e: Event): void {
            this.lastMouseVec2d = null

        }
        private onMouseMove(e: Event): void {

            if (this.lastMouseVec2d) {
                this.sceneMaager.focus3D.rotationY = this.lastfocus3D.rotationY - (this.mouseX - this.lastMouseVec2d.x)
                this.sceneMaager.focus3D.rotationX = this.lastfocus3D.rotationX - (this.mouseY - this.lastMouseVec2d.y) / 10

            }

        }

        public upData(): void {
            if (this.sceneMaager) {

                // this.sceneMaager.focus3D.rotationY++
                Pan3d.MathClass.getCamView(this.sceneMaager.cam3D, this.sceneMaager.focus3D); //一定要角色帧渲染后再重置镜头矩阵

                super.upData()
            }


        }

    }
}