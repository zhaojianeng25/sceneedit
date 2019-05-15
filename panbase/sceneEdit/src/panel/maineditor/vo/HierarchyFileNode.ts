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

    export class HierarchyNodeType {

        public static  Folder: number = 0;
        public static  Prefab: number = 1;
        public static  Light: number = 2;
        public static  Water: number = 3;
        public static  Grass: number = 4;
        public static  Capture: number = 5;
        public static  Build: number = 6;
        public static  Reflection: number = 7;
        public static  LightProbe: number = 8;
        public static  ParallelLight: number = 9;

        public static  Particle: number = 11;
        public static  Role: number = 12;
        public static  SKILL: number = 13;
        public static  Ground: number = 14;

        
    }

    export class HierarchyFileNode extends FileNode {
        public type: number;      //0 文件夹, 1prefab,2light
        public treeSelect: Boolean
        public lock: Boolean
        public isHide: Boolean
        public isOpen: boolean;
        public constructor() {
            super()
        }


    }
}