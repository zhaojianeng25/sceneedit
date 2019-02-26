module layout {
    import UICompenent = Pan3d.UICompenent
    import FrameCompenent = Pan3d.FrameCompenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import ColorType = Pan3d.ColorType
    import InteractiveEvent = Pan3d.InteractiveEvent
    import TextAlign = Pan3d.TextAlign
    import Rectangle = Pan3d.Rectangle
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
    import Vector2D = Pan3d.Vector2D
    import Scene_data = Pan3d.Scene_data


    export class LayoutbaseBg extends UIConatiner {

 
        public constructor() {
            super();
 
            this._pageRect = new Rectangle(0, 0, 300, 300)

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._bottomRender.uiAtlas = new UIAtlas();
            this._bottomRender.uiAtlas.setInfo("ui/basewin/basewin.txt", "ui/basewin/basewin.png", () => { this.loadConfigCom() });

        }

        private _bottomRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

 
        protected loadConfigCom(): void {
            this._topRender.uiAtlas = this._bottomRender.uiAtlas
 
            this.a_win_tittle = this.addEvntBut("a_win_tittle", this._topRender)
            this.a_bg = this.addEvntBut("a_bg", this._bottomRender);
 
            this.uiLoadComplete = true
            this.refrishSize()
 
        }
     
        public set pageRect(value: Rectangle) {
            this._pageRect = value;
            if (this.uiLoadComplete) {
                this.refrishSize();
            }
        }
        public get pageRect() {
            return this._pageRect;

        }
        private _pageRect: Rectangle;
        private a_bg: UICompenent;
        private a_win_tittle: UICompenent;
 
        private refrishSize(): void {

            this.left = this._pageRect.x;
            this.top = this._pageRect.y;
   
            this.a_win_tittle.x = 0;
            this.a_win_tittle.y = 0;
            this.a_win_tittle.width = this._pageRect.width;



            this.a_bg.x = 0;
            this.a_bg.y = 0
            this.a_bg.width = this._pageRect.width
            this.a_bg.height = this._pageRect.height


            this._topRender.applyObjData()
     

            this.resize();
          

        }


    }
}