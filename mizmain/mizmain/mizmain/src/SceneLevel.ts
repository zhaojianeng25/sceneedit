module base {
    import Vector2D = Pan3d.Vector2D
    import Rectangle = Pan3d.Rectangle
    import MouseType = Pan3d.MouseType
    import CombineParticle = Pan3d.CombineParticle
    import Scene_data = Pan3d.Scene_data


    import LayaScene2dPicSprit = LayaPan3D.LayaScene2dPicSprit;
    import LayaScene2dSceneChar = LayaPan3D.LayaScene2dSceneChar;

    import LayaGame2dDemo = LayaPan3D.LayaGame2dDemo;
    import LayaScene2D = LayaPan3D.LayaScene2D;


    export class CanvasScene extends LayaScene2D {
        public constructor(value: string, bfun: Function = null) { //"res/ui/icon/512.jpg"
            super(value, bfun)
        }
        protected initScene(): void {
            super.initScene();
            // this.addSceneModel();
        }

        private addSceneModel(): void {
            this.sceneManager.cam3D.scene2dScale = 2
            var $baseChar: LayaScene2dSceneChar = new LayaScene2dSceneChar();
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            this.sceneManager.addMovieDisplay($baseChar);
            $baseChar.set2dPos(100, 100);
            $baseChar.rotationY = 180;

        }


    }

    export class SceneLevel extends Laya.Box {
        private _bottomLayer: Laya.Box;
        private _midScene3dPic: CanvasScene;
        private _topLayer: Laya.Box;
        private _textRect: Pan3d.Rectangle;  //图片大小 是传入进来的图片的大小。 
        public constructor(value: string) {
            super();
            this._textRect = new Pan3d.Rectangle(0, 0, 512, 512)
            this._bottomLayer = new Laya.Box;
            this._midScene3dPic = new CanvasScene(value, () => { })
            this._topLayer = new Laya.Box;

            this.addChild(this._bottomLayer)
            this.addChild(this._midScene3dPic);
            this.addChild(this._topLayer);

            this.setSceneCanvas(512, 512)

        }
        public addMovieDisplay($display: LayaScene2dSceneChar): void {
            this._midScene3dPic.sceneManager.addMovieDisplay($display);
        }
        //设置背景颜色
        public setSceneBgColor(value: Pan3d.Vector3D): void {
            this._midScene3dPic.bgColor = value
        }
        //设置3D角色比例
        public setSceneScale(value: number): void {
            this._midScene3dPic.sceneManager.cam3D.scene2dScale = value;
            this._bottomLayer.scale(value / 4, value / 4)
            this._topLayer.scale(value / 4, value / 4)
        }
        //设计渲染范围
        public setSceneCanvas(w: number, h: number): void {
            this._midScene3dPic.scale(w / this._textRect.width, h / this._textRect.height);
        }
        //获取一个名字Label;
        public getNameLabelVo(): Laya.Label {
            var temp: Laya.Label = new Laya.Label("名字");
            temp.color = "#ff0000";
            temp.fontSize = 30;
            temp.x = 100;
            temp.y = 100;
            this._topLayer.addChild(temp);
            return temp;
        }
    }
}