module basefolderwin {
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


    export class BaseFolderWindow extends base.BaseWindow {

        public constructor( ) {
            super();
        }
 
        public setRect(value: Rectangle): void {
            this.pageRect = value
            this.resize()
            this.refrishSize()
        }
        protected loadConfigCom(): void {
            super.loadConfigCom();
            this.setUiListVisibleByItem([this.c_tittle_bg, this.c_win_bg], true)
        }
 

        private refrishSize(): void {
            var pageSizeEvet: folder.FolderEvent = new folder.FolderEvent(folder.FolderEvent.FILE_LIST_PANEL_CHANG);
            pageSizeEvet.data = new Rectangle(this.pageRect.x, this.pageRect.y, this.pageRect.width, this.pageRect.height-0);
            Pan3d.ModuleEventManager.dispatchEvent(pageSizeEvet);
 
        }
  
    }
}