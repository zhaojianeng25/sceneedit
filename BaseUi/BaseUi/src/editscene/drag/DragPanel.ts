module drag {

    import UICompenent = Pan3d.me.UICompenent
    import FrameCompenent = Pan3d.me.FrameCompenent
    import UIRenderComponent = Pan3d.me.UIRenderComponent
    import ColorType = Pan3d.me.ColorType
    import InteractiveEvent = Pan3d.me.InteractiveEvent
    import TextAlign = Pan3d.me.TextAlign
    import Rectangle = Pan3d.me.Rectangle
    import ModuleEventManager = Pan3d.me.ModuleEventManager
    import UIManager = Pan3d.me.UIManager
    import LabelTextFont = Pan3d.me.LabelTextFont
    import UIConatiner = Pan3d.me.UIConatiner
    import UIAtlas = Pan3d.me.UIAtlas
    import TextureManager = Pan3d.me.TextureManager

    import UIPanel = win.UIPanel

  
    export class DragPanel extends UIConatiner {
 
        private _bRender: UIRenderComponent;

        private tempUiName: string = "tempui";
        public ui: UICompenent
        public constructor(w: number, h: number) {
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
       

        }
        public setData(value: DragSource): void{
            if (value.icon) {
                this.ui.uiRender.uiAtlas.upDataPicToTexture(value.icon, this.ui.skinName);
            }

        }
    }
}