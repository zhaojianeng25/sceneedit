module prop {
    import Vector3D = Pan3d.Vector3D
    import Disp2DBaseText = Pan3d.Disp2DBaseText;
    import LabelTextFont = Pan3d.LabelTextFont;
    import Matrix3D = Pan3d.Matrix3D;
    import EventDispatcher = Pan3d.EventDispatcher;
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    import UIManager = Pan3d.UIManager;
    import Rectangle = Pan3d.Rectangle;
    import TimeUtil = Pan3d.TimeUtil;
    import TextAlign = Pan3d.TextAlign;
    import UICompenent = Pan3d.UICompenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import UIConatiner = Pan3d.UIConatiner
    import UIAtlas = Pan3d.UIAtlas
    import TextureManager = Pan3d.TextureManager

     

    export class TextureContext extends UIConatiner {
        private _bRender: UIRenderComponent;

        private tempUiName: string = "tempui";
        public ui: UICompenent
        public constructor(w: number , h: number ) {
            super();
            this._bRender = new UIRenderComponent();
            this.addRender(this._bRender);
            this._bRender.uiAtlas = new UIAtlas();
            var $uiAtlas: UIAtlas = this._bRender.uiAtlas
            $uiAtlas.configData = [];
            $uiAtlas.configData.push($uiAtlas.getObject(this.tempUiName, 0, 0, w, h, w, h));

            this.ui = <UICompenent>this._bRender.creatBaseComponent(this.tempUiName);
            this.ui.width = w;
            this.ui.height = h;
            this.addChild(this.ui)

            this._bRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(w, h, false);
            this._bRender.uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture(this._bRender.uiAtlas.ctx);
            //  this.ui.uiRender.uiAtlas.upDataPicToTexture("b.jpg", this.ui.skinName);

        }


    }
   
    export class BaseMeshUi extends EventDispatcher {
        protected textureContext: TextureContext
        public ui: UICompenent
        public constructor(w: number = 64, h: number=64) {
            super();
            this.textureContext = new TextureContext(w,h)
            PropModel.getInstance().propPanle.addUIContainer(this.textureContext);
            this.ui = this.textureContext.ui
        }
        public destory(): void {
            PropModel.getInstance().propPanle.removeUIContainer(this.textureContext);
        }
        protected addEvets(): void {
            var $ui: UICompenent = this.ui
            $ui.addEventListener(InteractiveEvent.Down, this.butClik, this);
        }
        protected butClik(evt: InteractiveEvent): void {

        }
        protected resize(): void {
            this.ui.x = this._x
            this.ui.y = this._y
       
        }
        private _x: number = 0
        private _y: number = 0;
        public set x(value: number) {
            this._x = value;
            this.resize()
        }
        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value;
            this.resize()
        }
        public get y(): number {
            return this._y
        }
    }

    import InteractiveEvent = Pan3d.InteractiveEvent
    export class TextLabelUI extends BaseMeshUi{
        public constructor(w: number = 64, h: number = 64) {
            super(w, h);
            this.initView();
            this.resize();
        }
        protected initView(): void
        {
        }
        public get label(): string {
            return "";
        }
        public set label(value: string) {
            LabelTextFont.writeSingleLabel(this.ui.uiRender.uiAtlas, this.ui.skinName, value, 14, TextAlign.LEFT, "#ffffff", "#27262e");
        }

    }
} 