module prop {
    import TextureManager = Pan3d.me.TextureManager
    import Scene_data = Pan3d.me.Scene_data
    import InteractiveEvent = Pan3d.me.InteractiveEvent
    import TimeUtil = Pan3d.me.TimeUtil
    import MouseType = Pan3d.me.MouseType;
 
    import GlReset = Pan3d.me.GlReset;
    import LineDisplayShader = Pan3d.me.LineDisplayShader;
    import GridLineSprite = Pan3d.me.GridLineSprite;
    import ProgrmaManager = Pan3d.me.ProgrmaManager;
    import BaseDiplay3dSprite = Pan3d.me.BaseDiplay3dSprite;
    import Camera3D = Pan3d.me.Camera3D;
    import Rectangle = Pan3d.me.Rectangle;
    import UIRenderComponent = Pan3d.me.UIRenderComponent
    import FBO = Pan3d.me.FBO;

    //import MaterialRoleSprite = left.MaterialRoleSprite;
    //import ModelSprite = maineditor.ModelSprite;
    //import SkillSpriteDisplay = maineditor.SkillSpriteDisplay;
    //import LyfSpriteDisplay = maineditor.LyfSpriteDisplay;
    //import EdItorSceneManager = maineditor.EdItorSceneManager;

    export class MeshSceneView2DUI extends BaseReflComponent {

        protected textLabelUI: TextLabelUI;
        protected textureUrlText: TextLabelUI;
        protected texturePicUi: TexturePicUi
 
        protected initView(): void {
            this.textLabelUI = new TextLabelUI(64, 16)
            this.textureUrlText = new TextLabelUI(200, 16)
            this.texturePicUi = new TexturePicUi(128, 128)
            this.texturePicUi.haveDoubleCilk = false;
 

            this.propPanle.addBaseMeshUi(this.textLabelUI)
            this.propPanle.addBaseMeshUi(this.textureUrlText)
            this.propPanle.addBaseMeshUi(this.texturePicUi)

           // this.texturePicUi.url = "icon/base.jpg"
            this.texturePicUi.ui.addEventListener(InteractiveEvent.Down, this.butClik, this);

            this.wheelEventFun = ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) }
            document.addEventListener(MouseType.MouseWheel, this.wheelEventFun);
 
            this.height = 200;

            this.texturePicUi.ui.width = 128
            this.texturePicUi.ui.height = 128


            this.initScene()
   
        }
        private wheelEventFun: any
        public onMouseWheel($evt: MouseWheelEvent): void {
      
            if (this.texturePicUi.ui.testPoint($evt.x, $evt.y)) {
                this.sceneManager.cam3D.distance += ($evt.wheelDelta * Scene_data.cam3D.distance) / 1000;
            }

    
        }
        private butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.texturePicUi.ui:
 
                    this.lastRotationY = this.sceneManager.focus3D.rotationY
                    this.mouseDonwPos = new Vector2D(evt.x, evt.y)
                    this.addStagetMouseMove()

                    break;
                default:
                    break;
            }

        }
        private lastRotationY: number
        private mouseDonwPos: Vector2D
        private addStagetMouseMove(): void {
        
             Scene_data.uiBlankStage.addEventListener( InteractiveEvent.Up, this.onStageMouseUp, this);
             Scene_data.uiBlankStage.addEventListener( InteractiveEvent.Move, this.onStageMouseMove, this);
        }
        private removeStagetMouseMove(): void {
            Scene_data.uiBlankStage.removeEventListener(  InteractiveEvent.Up, this.onStageMouseUp, this);
            Scene_data.uiBlankStage.removeEventListener( InteractiveEvent.Move, this.onStageMouseMove, this);
        }
        private onStageMouseMove($evt:  InteractiveEvent): void {
            console.log("move")
            if (this.mouseDonwPos) {
                this.sceneManager.focus3D.rotationY = this.lastRotationY - ($evt.x - this.mouseDonwPos.x);
            }
        }
        private onStageMouseUp($evt:  InteractiveEvent): void {
            console.log("up")
            this.removeStagetMouseMove()
        }
        private sceneManager: maineditor.EdItorSceneManager;
        protected initScene(): void {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            this.sceneManager = new maineditor.EdItorSceneManager()
            var temp: GridLineSprite = new GridLineSprite()
            this.sceneManager.addDisplay(temp)
            this.sceneManager.addDisplay(new BaseDiplay3dSprite())
            this.sceneManager.ready = true;
            this.sceneManager.cam3D = new Camera3D();
            this.sceneManager.cam3D.cavanRect = new Rectangle(0, 0, 128, 128)
            this.sceneManager.cam3D.distance = 200;
           // this.sceneManager.focus3D.rotationY = random(360);
           this.sceneManager.focus3D.rotationX = -45;
 
            this.upDataFun = () => { this.oneByFrame() }

            TimeUtil.addFrameTick(this.upDataFun);

          
        }
        protected addDisplay(): void {
     
        }

        private upDataFun: any
        private oneByFrame(): void {
 
            if (this.texturePicUi && this.texturePicUi.textureContext && this.texturePicUi.textureContext.hasStage) {
                Pan3d.me.MathClass.getCamView(this.sceneManager.cam3D, this.sceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵

              //  this.sceneManager.cam3D.cameraMatrix.appendScale(1, -1, 1);
             

                this.sceneManager.renderToTexture( )

                var $uiRender: UIRenderComponent = this.texturePicUi.textureContext.ui.uiRender;
               
                if ($uiRender.uiAtlas.textureRes) {
                    $uiRender.uiAtlas.textureRes.texture = this.sceneManager.fbo.texture
                }
         
            }
        }
  
       
        public destory(): void {
            this.texturePicUi.ui.removeEventListener(InteractiveEvent.Down, this.butClik, this);
            document.removeEventListener(MouseType.MouseWheel, this.wheelEventFun);

            this.textLabelUI.destory();
            this.textureUrlText.destory();
            this.texturePicUi.destory();

            this.texturePicUi = null;
            this.sceneManager.clearScene()
            TimeUtil.removeTimeTick(this.upDataFun);
        }
        public set data(value: any) {
            this._data = value;

        }
        public get data(): any {
            return this._data
        }
        private modelKey: any = {}
        private addUrlToView(value: string): void {
          
            if (!this.modelKey[value]) {
                if (value.indexOf(".prefab")!=-1) {
                    let prefabSprite: maineditor.ModelSprite = new maineditor.ModelSprite();
                    prefabSprite.setPreFabUrl(value);
                    this.sceneManager.addDisplay(prefabSprite);
                }
 
                this.modelKey[value] = true
            }

       
        }
        public refreshViewValue(): void {

            var $url: string = String(this.target[this.FunKey]);
           this.texturePicUi.url = $url

            this.addUrlToView($url)


            var $arr: Array<string> = $url.split("/");
            this.textureUrlText.label = $arr[$arr.length - 1];

        }
        public set x(value: number) {
            this._x = value;
            this.textLabelUI.x = this._x + 0;
            this.texturePicUi.x = this._x + 60;
            this.textureUrlText.x = this._x + 60
  
        }
        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value;
            this.textLabelUI.y = this._y
            this.texturePicUi.y = this._y+5
            this.textureUrlText.y = this._y + 128+20
 
        }
        public get y(): number {
            return this._y
        }
        public get label(): string {
            return this._label;
        }
        public set label(value: string) {
            this._label = value
            this.textLabelUI.label = value;
        }
    

    }



}