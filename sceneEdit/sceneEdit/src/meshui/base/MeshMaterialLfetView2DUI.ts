module prop {
    import TextureManager = Pan3d.me.TextureManager
    import Scene_data = Pan3d.me.Scene_data
    import InteractiveEvent = Pan3d.me.InteractiveEvent
    import TimeUtil = Pan3d.me.TimeUtil
    import MouseType = Pan3d.me.MouseType;

    import GlReset = Pan3d.me.GlReset;
    import LineDisplayShader = Pan3d.me.LineDisplayShader;
    import GridLineSprite = Pan3d.me.GridLineSprite;
    import ProgrmaManager = Pan3d.me.ProgrmaManager;
    import BaseDiplay3dSprite = Pan3d.me.BaseDiplay3dSprite;
    import Camera3D = Pan3d.me.Camera3D;
    import Rectangle = Pan3d.me.Rectangle;
    import UIRenderComponent = Pan3d.me.UIRenderComponent
    import FBO = Pan3d.me.FBO;

    //import MaterialRoleSprite = left.MaterialRoleSprite;
    //import ModelSprite = maineditor.ModelSprite;
    //import SkillSpriteDisplay = maineditor.SkillSpriteDisplay;
    //import LyfSpriteDisplay = maineditor.LyfSpriteDisplay;
    //import EdItorSceneManager = maineditor.EdItorSceneManager;

    export class MeshMaterialLfetView2DUI extends MeshSceneView2DUI {

 
        public set x(value: number) {
            this._x = value;
            this.textLabelUI.x = this._x + 100000;
            this.texturePicUi.x = this._x + 10;
            this.textureUrlText.x = this._x + 10000

        }
       

    }



}