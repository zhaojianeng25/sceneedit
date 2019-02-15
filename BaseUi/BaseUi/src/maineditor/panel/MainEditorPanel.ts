module maineditor {

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

    export class MainEditorPanel extends UIConatiner {

        public constructor() {
            super();
            this.pageRect = new Rectangle(0, 0, 500, 500)
            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._bottomRender.uiAtlas = new UIAtlas();
            this._bottomRender.uiAtlas.setInfo("ui/editscene/editscene.txt", "ui/editscene/editscene.png", () => { this.loadConfigCom() });

        }

        private _bottomRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        protected loadConfigCom(): void {
            this._topRender.uiAtlas = this._bottomRender.uiAtlas
         


            this.a_win_tittle = this.addEvntBut("a_win_tittle", this._topRender)
            this.a_win_tittle.x = 0
            this.a_win_tittle.y = 0

            this.a_win_bg = this.addEvntBut("a_win_bg", this._bottomRender)
            this.a_win_bg.x = 0
            this.a_win_bg.y = 25

            this.setUiListVisibleByItem([this.a_win_tittle], false);

            this.uiLoadComplete = true
            this.refrishSize()

        }
        private a_win_tittle: UICompenent
 
        protected butClik(evt: InteractiveEvent): void {
            if (this.perent) {

            }
        }
        public resize(): void {
            super.resize();
        }
        private pageRect: Rectangle
        public panelEventChanger(value: Rectangle): void {
            if (this.pageRect) {
                this.pageRect.height = value.height;
                this.pageRect.width = value.width;
                this.left = value.x;
                this.top = value.y;
                this.refrishSize();
            }

        }
        public refrishSize(): void {
            if (this.uiLoadComplete) {
                this.a_win_bg.width = this.pageRect.width;
                this.a_win_bg.height = this.pageRect.height-25;
                this.a_win_tittle.width = this.pageRect.width;

                this._bottomRender.applyObjData()
                this._topRender.applyObjData()
   
            }

            this.resize()
        }

        private a_win_bg: UICompenent;


    }

}

