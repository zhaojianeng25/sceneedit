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
 
    export class MaterialCavasPanel extends UIConatiner {
 
        public constructor() {
            super();
 
            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._bottomRender.uiAtlas = new UIAtlas();
            this._bottomRender.uiAtlas.setInfo("ui/materialmenu/materialmenu.txt", "ui/materialmenu/materialmenu.png", () => { this.loadConfigCom() });

        }
  
        private _bottomRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
 
        protected loadConfigCom(): void {
            this._topRender.uiAtlas = this._bottomRender.uiAtlas


            this.a_base_bg = this.addEvntBut("a_base_bg", this._topRender)
            this.a_save_but = this.addEvntBut("a_save_but", this._topRender)
            this.a_compile_but = this.addEvntBut("a_compile_but", this._topRender)

    
            this.uiLoadComplete = true
            this.resize()

        }
        private a_save_but: UICompenent
        private a_compile_but: UICompenent
        protected butClik(evt: InteractiveEvent): void {
            if (this.perent) {
               // (<Panel>this.perent).removeUIContainer(this)
            }
        }
        public resize(): void {
            if (this.perent && this.uiLoadComplete) {
                var rect: Rectangle = (<Panel>this.perent).rect
                this.a_base_bg.x = rect.x  
                this.a_base_bg.width = rect.width  
                this.a_base_bg.y = 25;
                this.a_base_bg.height=30

                this.a_save_but.x = rect.x + rect.width-100
                this.a_save_but.y = this.a_base_bg.y
                this.a_compile_but.x = this.a_save_but.x+50
                this.a_compile_but.y = this.a_base_bg.y
            }
            super.resize();
        }
 
        private a_base_bg: UICompenent;
 

    }

}

