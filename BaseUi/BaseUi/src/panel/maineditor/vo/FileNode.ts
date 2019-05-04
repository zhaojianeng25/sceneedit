module maineditor {
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
    import Dis2DUIContianerPanel = Pan3d.me.Dis2DUIContianerPanel;
    import Disp2DBaseText = Pan3d.me.Disp2DBaseText
    import UIRectangle = Pan3d.me.UIRectangle
    import baseMeshVo = Pan3d.me.baseMeshVo
    import UIMask = Pan3d.me.UIMask
    import UiDraw = Pan3d.me.UiDraw
    import UIData = Pan3d.me.UIData
    import UIAtlas = Pan3d.me.UIAtlas
    import MouseType = Pan3d.me.MouseType
    import FileVo = pack.FileVo
    import Vector2D = Pan3d.me.Vector2D
    import Vector3D = Pan3d.me.Vector3D
    import Scene_data = Pan3d.me.Scene_data
    import TextureManager = Pan3d.me.TextureManager
    import LoadManager = Pan3d.me.LoadManager

    export class FileNode {

        public id: number;
        public name: string;
        public path: string;
        public url: string;
        public extension: string;
        public children: Array<any>;
        public rename: Boolean;
        public parentNode: FileNode;
        public data: any
        public static FILE_NODE: string = "fileNode"
        public constructor() {
            
        }

    }
}