module win {
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


    export class LayoutbaseBg extends win.BaseWindow {
  
        protected loadConfigCom(): void {
            super.loadConfigCom();
            this.setUiListVisibleByItem([this.a_scroll_bar, this.a_scroll_bar_bg], false)
        }
       

    }
}