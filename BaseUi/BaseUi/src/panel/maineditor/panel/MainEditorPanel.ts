module maineditor {

    import Rectangle = Pan3d.Rectangle
    import Vector2D = Pan3d.Vector2D
    import Scene_data = Pan3d.Scene_data

    import UICompenent = Pan3d.UICompenent


    import TextureManager = Pan3d.TextureManager
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
    import UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent
    import baseMeshVo = Pan3d.baseMeshVo
    import ProgrmaManager = Pan3d.ProgrmaManager
    import UIMask = Pan3d.UIMask
    import UiDraw = Pan3d.UiDraw
    import UIData = Pan3d.UIData
    import UIAtlas = Pan3d.UIAtlas
    import Shader3D = Pan3d.Shader3D
    import TextureRes = Pan3d.TextureRes
    import MouseType = Pan3d.MouseType
    import MathUtil = Pan3d.MathUtil

    import PanDragEvent = drag.PanDragEvent

    import Sprite = win.Sprite
    import Panel = win.Panel

    

    export class MainEditorPanel extends win.BaseWindow {

        public constructor() {
            super();
            this.pageRect = new Rectangle(0, 0, 500, 500)
            this._sceneViewRender = new UiModelViewRender();
            this.addRender(this._sceneViewRender)

        }
        public set sceneProjectVo(value: SceneProjectVo) {
            if (value) {
                this._sceneViewRender.textureurl = value.textureurl;
            }
         
        }
        
        private _sceneViewRender: UiModelViewRender;
        protected loadConfigCom(): void {
            super.loadConfigCom();
 
            this.initView()

            this.uiLoadComplete = true
            this.refrishSize()

        }
        private a_scene_view: UICompenent
        private initView(): void {
            this._sceneViewRender.uiAtlas = this._tRender.uiAtlas
            this.a_scene_view = this.addChild(this._sceneViewRender.getComponent("a_scene_view"));
            TextureManager.getInstance().getTexture("res/shuangdaonv.jpg", ($texture: TextureRes) => {
                this._sceneViewRender.textureRes = $texture;
                Pan3d.TimeUtil.addFrameTick((t: number) => { this.upFrame(t) });
            });

            this.a_scene_view.addEventListener(PanDragEvent.DRAG_DROP, this.dragDrop, this);
            this.a_scene_view.addEventListener(PanDragEvent.DRAG_ENTER, this.dragEnter, this);
            this.a_scene_view.addEventListener(InteractiveEvent.Down, this.butClik, this);
 
            document.addEventListener(MouseType.MouseWheel, ($evt: MouseWheelEvent) => { this.onPanellMouseWheel($evt) });
        }
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_scene_view:
                    if (evt.mouseEvent.ctrlKey || evt.mouseEvent.shiftKey) {

                        ModuleEventManager.dispatchEvent(new MainEditorEvent(MainEditorEvent.SCENE_SELECT_SPRITE_DOWN), evt)
                    }
                    break
                default:
                    break
            }

        }
        public onPanellMouseWheel($evt: MouseWheelEvent): void {
            var $slectUi: UICompenent = win.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y))
            if ($slectUi && $slectUi.parent == this) {

                var q: Pan3d.Quaternion = new Pan3d.Quaternion();
                q.fromMatrix(MainEditorProcessor.edItorSceneManager.cam3D.cameraMatrix);
                var m: Pan3d.Matrix3D = q.toMatrix3D()
                m.invert()
                var $add: Vector3D = m.transformVector(new Vector3D(0, 0, $evt.wheelDelta / 100 ))
                MainEditorProcessor.edItorSceneManager.cam3D.x += $add.x
                MainEditorProcessor.edItorSceneManager.cam3D.y += $add.y
                MainEditorProcessor.edItorSceneManager.cam3D.z += $add.z

                MathUtil.MathCam(MainEditorProcessor.edItorSceneManager.cam3D)
 
            }
        }
        private dragDrop(evt: PanDragEvent): void {
            if (this.testSuffix(drag.DragManager.dragSource.url)) {
                console.log("可以拖动")
            } else {
                console.log("不可以")
            }

        }
        public suffix: string="prefab|lyf"
        private testSuffix(value: string): boolean {
            if (!this.suffix) {
                return;
            }
            var tempItem: Array<string> = this.suffix.split("|")
            for (var i: number = 0; i < tempItem.length; i++) {
                if (value.indexOf(tempItem[i]) != -1) {
                    return true
                }
            }
            return false
        }
        private dragEnter(evt: PanDragEvent): void {
            if (this.testSuffix(drag.DragManager.dragSource.url)) {
                var obj: any = {}
                obj.url = drag.DragManager.dragSource.url
                obj.name = "新对象";
                obj.pos = MainEditorProcessor.edItorSceneManager.getGroundPos(new Vector2D(evt.data.x, evt.data.y))

                if (drag.DragManager.dragSource.url.indexOf(".lyf")!=-1) {
                    ModuleEventManager.dispatchEvent(new MainEditorEvent(MainEditorEvent.INPUT_LYF_TO_SCENE), obj)
                } 
                if (drag.DragManager.dragSource.url.indexOf(".prefab") != -1) {
                    ModuleEventManager.dispatchEvent(new MainEditorEvent(MainEditorEvent.INPUT_PREFAB_TO_SCENE), obj)
                }

              
            }
        }
  
        private upFrame(t: number): void {
       
            if (this.hasStage) {
                MainEditorProcessor.edItorSceneManager.textureRes = this._sceneViewRender.textureRes;
                var cam3D: Pan3d.Camera3D = MainEditorProcessor.edItorSceneManager.cam3D
                cam3D.cavanRect.x = this.a_scene_view.x + this.left;
                cam3D.cavanRect.y = this.a_scene_view.y + this.top;
                cam3D.cavanRect.width = this.a_scene_view.width;
                cam3D.cavanRect.height = this.a_scene_view.height;

                MainEditorProcessor.edItorSceneManager.renderToTexture()
            }
        }
       
     
        public resize(): void {
            super.resize();
        }
     
        public panelEventChanger(value: Rectangle): void {
          

            this.setRect(value)
            this.refrishSize()

        }
        public refrishSize(): void {
  
            this.resize()

            if (this.uiLoadComplete) {
                var roundNum: number = 1;
                this.a_scene_view.x = roundNum;
                this.a_scene_view.y = roundNum;
                this.a_scene_view.width = this.pageRect.width - roundNum * 2;
                this.a_scene_view.height = this.pageRect.height - roundNum * 2;

            }
        }

  


    }

}

