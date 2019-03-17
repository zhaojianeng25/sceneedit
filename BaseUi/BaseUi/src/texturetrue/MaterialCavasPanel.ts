module materialui {
 
    import Rectangle = Pan3d.Rectangle
    import Vector2D = Pan3d.Vector2D
    import Scene_data = Pan3d.Scene_data

    import UICompenent = Pan3d.UICompenent
    import Sprite = layout.Sprite


    import FrameCompenent = Pan3d.FrameCompenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import ColorType = Pan3d.ColorType
    import InteractiveEvent = Pan3d.InteractiveEvent
    import TextAlign = Pan3d.TextAlign

    import ModuleEventManager = Pan3d.ModuleEventManager
    import UIManager = Pan3d.UIManager
    import LabelTextFont = Pan3d.LabelTextFont
    import UIConatiner = Pan3d.UIConatiner;
    import Disp2DBaseText = Pan3d.Disp2DBaseText
    import UIRectangle = Pan3d.UIRectangle
    import baseMeshVo = Pan3d.baseMeshVo
    import UIMask = Pan3d.UIMask
    import UiDraw = Pan3d.UiDraw
    import UIData = Pan3d.UIData
    import UIAtlas = Pan3d.UIAtlas
    import Panel = layout.Panel
    //ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));

    import Vector3D = Pan3d.Vector3D
 
    import Matrix3D = Pan3d.Matrix3D;
    import EventDispatcher = Pan3d.EventDispatcher;
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
  
    import TimeUtil = Pan3d.TimeUtil;
     import TextureManager = Pan3d.TextureManager



    export class TextureContext extends UIConatiner {
        private _bRender: UIRenderComponent;

        private tempUiName: string = "tempui";
        public ui: UICompenent;

        public uiViewScale: number = 0.5;

        public constructor(w: number, h: number) {
            super();
            w /= this.uiViewScale;
            h /= this.uiViewScale;

            this._bRender = new UIRenderComponent();
            this.addRender(this._bRender);
            this._bRender.uiAtlas = new UIAtlas();
            var $uiAtlas: UIAtlas = this._bRender.uiAtlas
            $uiAtlas.configData = [];


            var kkwA: number = Math.pow(2, Math.ceil(Math.log(w) / Math.log(2)))
            var kkhB: number = Math.pow(2, Math.ceil(Math.log(h) / Math.log(2)))



            this._bRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(kkwA, kkhB, false);
            this._bRender.uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture(this._bRender.uiAtlas.ctx);

            $uiAtlas.configData.push($uiAtlas.getObject(this.tempUiName, 0, 0, w, h, kkwA, kkhB));

            this.ui = <UICompenent>this._bRender.creatBaseComponent(this.tempUiName);
            this.ui.width = w * this.uiViewScale;
            this.ui.height = h * this.uiViewScale;
            this.addChild(this.ui);




            //  this.ui.uiRender.uiAtlas.upDataPicToTexture("b.jpg", this.ui.skinName);

        }


    }
    export class MaterialCavasPanel extends base.BaseWindow {
 
       
        private blakCavansRender: UIRenderComponent
        private lineCavansRenderA: UIRenderComponent
        private lineCavansRenderB: UIRenderComponent
        public constructor() {
            super();
            this.lineItem = [];
            this.setRect(new Rectangle(0, 0, Scene_data.stageWidth, Scene_data.stageHeight))


            this.blakCavansRender = new UIRenderComponent();
            this.addRender(this.blakCavansRender);
            this.blakCavansRender.uiAtlas = this.makeBaseUiatlas(64, 64);


            this.lineCavansRenderA = new UIRenderComponent();
            this.addRender(this.lineCavansRenderA);
            this.lineCavansRenderA.uiAtlas = this.makeBaseUiatlas(64, 64);

            this.lineCavansRenderB = new UIRenderComponent();
            this.addRender(this.lineCavansRenderB);
            this.lineCavansRenderB.uiAtlas = this.lineCavansRenderA.uiAtlas



        }
        private drawOutColor(ui: UICompenent, $vcolor): void {
           // var $vcolor: Vector3D = new Vector3D(1 * 255, 0,0);
            var $UIAtlas: UIAtlas = ui.uiRender.uiAtlas
            var $textureStr: string = ui.skinName
            var rec: UIRectangle = $UIAtlas.getRec($textureStr);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var $imgData: ImageData = ctx.getImageData(0, 0, rec.pixelWitdh, rec.pixelHeight);
            for (var i: number = 0; i < $imgData.data.length / 4; i++) {
                $imgData.data[i * 4 + 0] = $vcolor.x;
                $imgData.data[i * 4 + 1] = $vcolor.y;
                $imgData.data[i * 4 + 2] = $vcolor.z;
                $imgData.data[i * 4 + 3] = 255;
            }
            ctx.putImageData($imgData, 0, 0)
            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        }

        private tempListBg: UICompenent;
        private lineItem: Array<UICompenent>
        protected loadConfigCom(): void {
            super.loadConfigCom();
 
 
            this.tempListBg= <UICompenent>this.blakCavansRender.creatBaseComponent("temp_ui");
            this.addChild(this.tempListBg);
            this.tempListBg.x = 0;
            this.tempListBg.y = 0;
            this.tempListBg.width = Scene_data.stageWidth;
            this.tempListBg.height = Scene_data.stageHeight;
            this.drawOutColor(this.tempListBg, new Vector3D(42, 42, 42))




            var tempLine: UICompenent = <UICompenent>this.lineCavansRenderA.creatBaseComponent("temp_ui");
            this.drawOutColor(tempLine, new Vector3D(53, 53, 53))

            var tempLineB: UICompenent = <UICompenent>this.lineCavansRenderB.creatBaseComponent("temp_ui");
            this.drawOutColor(tempLineB, new Vector3D(53, 53, 53))

    
            for (var i: number = 0; i < 50; i++) {
 
                var $tempA: UICompenent = this.addChild(<UICompenent>this.lineCavansRenderA.creatBaseComponent("temp_ui"));
                $tempA.x = 0;
                $tempA.y = i * 30;
                $tempA.width = Scene_data.stageWidth
                $tempA.height = 2;

                var $tempB: UICompenent = this.addChild(<UICompenent>this.lineCavansRenderB.creatBaseComponent("temp_ui"));
                $tempB.x = i * 30;
                $tempB.y = 0
                $tempB.width = 2;
                $tempB.height = Scene_data.stageHeight

                this.lineItem.push($tempA);
            }
 
        

        }

    }

}

