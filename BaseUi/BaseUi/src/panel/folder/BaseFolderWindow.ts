module basefolderwin {
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
    import UIConatiner = Pan3d.me.UIConatiner;
    import Disp2DBaseText = Pan3d.me.Disp2DBaseText
    import UIRectangle = Pan3d.me.UIRectangle
    import baseMeshVo = Pan3d.me.baseMeshVo
    import UIMask = Pan3d.me.UIMask
    import UiDraw = Pan3d.me.UiDraw
    import UIData = Pan3d.me.UIData
    import UIAtlas = Pan3d.me.UIAtlas
    import Vector2D = Pan3d.me.Vector2D
    import Scene_data = Pan3d.me.Scene_data


    export class BaseFolderWindow extends win.BaseWindow {

        public constructor( ) {
            super();
        }
 
        public setRect(value: Rectangle): void {
            this.pageRect = value;
            this.setLinePos();
            this.resize();
            this.refrishWinSize()
        }
        public getPageRect(): Rectangle {
            return this.pageRect
        }
        public percentNum: number = 0.2;
        private setLinePos(): void {
            if (this.moveLine) {
                this.moveLine.x = this.pageRect.width * this.percentNum
                this.moveLine.y = 0
                this.moveLine.width = 5
                this.moveLine.height = this.pageRect.height
               // console.log("设置位置")
            }
      
        }
        protected loadConfigCom(): void {
            super.loadConfigCom();
            this.setUiListVisibleByItem([this.c_tittle_bg, this.c_win_bg], true)

            this.moveLine = this.addChild(this._baseMidRender.getComponent("b_line_pixe_point"));
            this.moveLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
 
            this.setLinePos();

            this.resize();
        }
        protected tittleMouseDown(evt: InteractiveEvent): void {
            this.mouseMoveTaget = evt.target
            this.lastMousePos = new Vector2D(evt.x, evt.y)
            switch (this.mouseMoveTaget) {
                case this.moveLine:
                    this.lastPagePos = new Vector2D(this.moveLine.x, this.moveLine.y)
                    break
                default:
                    console.log("nonono")
                    break

            }
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        }
        private refrishWinSize(): void {
            Pan3d.me.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.RESET_FOLDE_WIN_SIZE));
        }
        protected mouseOnTittleMove(evt: InteractiveEvent): void {
            switch (this.mouseMoveTaget) {
                case this.moveLine:
                    this.moveLine.x = this.lastPagePos.x + (evt.x - this.lastMousePos.x)

                    this.moveLine.x = Math.min(this.moveLine.x, this.pageRect.width * 0.6)
                    this.moveLine.x = Math.max(this.moveLine.x, this.pageRect.width * 0.2)

                    this.percentNum = this.moveLine.x / this.pageRect.width;

                    this.refrishWinSize();

                default:
                    console.log("nonono")
                    break

            }
            this.resize()

        }
   
    
        private moveLine: UICompenent
 

     
  
    }
}