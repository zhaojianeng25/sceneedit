module maineditor {

    import Rectangle = Pan3d.me.Rectangle
    import Vector2D = Pan3d.me.Vector2D
    import Scene_data = Pan3d.me.Scene_data

    import UICompenent = Pan3d.me.UICompenent


    import TextureManager = Pan3d.me.TextureManager
    import FrameCompenent = Pan3d.me.FrameCompenent
    import Grid9Compenent = Pan3d.me.Grid9Compenent
    import UIRenderComponent = Pan3d.me.UIRenderComponent
    import ColorType = Pan3d.me.ColorType
    import InteractiveEvent = Pan3d.me.InteractiveEvent
    import TextAlign = Pan3d.me.TextAlign

    import ModuleEventManager = Pan3d.me.ModuleEventManager
    import UIManager = Pan3d.me.UIManager
    import LabelTextFont = Pan3d.me.LabelTextFont
    import UIConatiner = Pan3d.me.UIConatiner;
    import Disp2DBaseText = Pan3d.me.Disp2DBaseText
    import UIRectangle = Pan3d.me.UIRectangle
    import UIRenderOnlyPicComponent = Pan3d.me.UIRenderOnlyPicComponent
    import baseMeshVo = Pan3d.me.baseMeshVo
    import ProgrmaManager = Pan3d.me.ProgrmaManager
    import UIMask = Pan3d.me.UIMask
    import UiDraw = Pan3d.me.UiDraw
    import UIData = Pan3d.me.UIData
    import UIAtlas = Pan3d.me.UIAtlas
    import Shader3D = Pan3d.me.Shader3D
    import TextureRes = Pan3d.me.TextureRes
    import MouseType = Pan3d.me.MouseType
    import MathUtil = Pan3d.me.MathUtil
    import TextRegExp = Pan3d.me.TextRegExp
 

    import PanDragEvent = drag.PanDragEvent

    import Sprite = win.Sprite
    import Panel = win.Panel


    export class SelectFileListText extends Disp2DBaseText {

        public bgUi: UICompenent;
        public id: number;
        public tittlestr: string;
 

        public set select(value: boolean) {
            this._select = value
            this.makeData()
        }
        private _select: boolean
        public get select(): boolean {
            return this._select 
        }
 
        public makeData(): void {
            if (this.tittlestr) {
                var $uiRec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
                this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
             
                this.parent.uiAtlas.ctx.clearRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight);

                var nameStr: string = this.tittlestr;
                if (this._select) {
                    nameStr = "[ffffff]" + nameStr;
                } else {
                    nameStr = "[9c9c9c]" + nameStr;
                }
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, nameStr, 24, 1, 1, TextAlign.LEFT);
                TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, this.parent.uiAtlas.ctx);


            }
        }
    

    }
   
    export class EditorOpenList {
        private perent: MainEditorPanel
        private topRender: UIRenderComponent
        public constructor(value: MainEditorPanel, render: UIRenderComponent) {
            this.perent = value
            this.topRender = render;

            this.openlist=[]
    
            this.tabItemArr = [];


            var strItem: Array<string>=[]
            strItem.push("场景/scene.scene");
            strItem.push("角色/新场景.scene");
            strItem.push("chuangguangfuben.texture");
            strItem.push("飞机材质.texture");
            strItem.push("角色模型.texture");


            this.openlist = strItem;

            this.showList(this.openlist);
        
        }
        private openlist: Array<string>
        private clear(): void {
            while (this.tabItemArr.length) {
                var tabVo: SelectFileListText = this.tabItemArr.pop();
                this.perent.removeChild(tabVo.bgUi);
                tabVo.bgUi.removeEventListener(InteractiveEvent.Down, this.tabBgClik, this);
                this.perent.clearTemp(tabVo.data);
            }
        }
 
        private tabItemArr: Array<SelectFileListText>;
        private tabBgClik(evt: InteractiveEvent): void {
            var tabVo: SelectFileListText = evt.target.data

            var ui: UICompenent = evt.target;

            console.log("tabVo.id, evt.x, tabVo.ui.x, tabVo.ui.width");
            console.log(tabVo.id, evt.x, ui.absoluteX, ui.absoluteWidth);

            if ((evt.x - ui.absoluteX) < (ui.absoluteWidth - 20)) {
                console.log("选")
            } else {
                console.log("关")
            }
        

            this.selectTabIndex = tabVo.id;
            this.showList(this.openlist);

        }
        public selectTabIndex: number=0
        private showList(value: Array<string>): void {
            this.clear()
          
            var tx: number = 2
            for (var i: number = 0; i < value.length; i++) {
                var skinName: string = "e_edit_select_bg_1"
      
                // [ffffff]"[9c9c9c]" 

                var $tittlestr: string = value[i].split("/")[value[i].split("/").length - 1];
                var $pathurl: string = value[i]

                if (i == this.selectTabIndex) {
                    skinName = "e_edit_select_bg_2"
                } else {
                    skinName = "e_edit_select_bg_1"
                }

                var $ctx = UIManager.getInstance().getContext2D(100, 100, false);
                $ctx.font = "13px " + UIData.font;
             
                var $textMetrics: TextMetrics = TextRegExp.getTextMetrics($ctx, $tittlestr);
                var tabVo: SelectFileListText = <SelectFileListText>this.perent.showTemp($pathurl);
                tabVo.id = i;
                tabVo.tittlestr = $tittlestr;
                tabVo.select = (i == this.selectTabIndex);
   
                tabVo.bgUi = this.perent.addChild(<UICompenent>this.topRender.getComponent(skinName));
                tabVo.bgUi.x = tx 
                tabVo.bgUi.y = 1
                tabVo.bgUi.width = Math.floor($textMetrics.width) + 20+25;
                tabVo.bgUi.height = 22;
                tabVo.bgUi.data = tabVo

                tabVo.bgUi.addEventListener(InteractiveEvent.Down, this.tabBgClik, this);

                tx += tabVo.bgUi.width - 1;
 
                tabVo.ui.x = tabVo.bgUi.x+10;
                tabVo.ui.y = tabVo.bgUi.y + 5;
                tabVo.ui.width = 256;
                tabVo.ui.height = 20;


                this.tabItemArr.push(tabVo)

            }
            this.topRender.applyObjData();

        }
 
    }


    export class MainEditorPanel extends win.Dis2dBaseWindow{

        public constructor() {
            super(SelectFileListText, new Rectangle(0, 0, 512, 40), 10);
            this.pageRect = new Rectangle(0, 0, 500, 500)
            this._sceneViewRender = new UiModelViewRender();
            this.addRender(this._sceneViewRender)

        }
        public set sceneProjectVo(value: SceneProjectVo) {
            this._sceneViewRender.sceneProjectVo = value
        }

    
        
        private _sceneViewRender: UiModelViewRender;
        private e_line_left: UICompenent
        private e_line_right: UICompenent
        private e_centen_panel: Grid9Compenent
        protected loadConfigCom(): void {
            super.loadConfigCom();


            this.e_centen_panel = <Grid9Compenent>this.addChild(<UICompenent>this._baseMidRender.getComponent("e_centen_panel")); 
 
            new EditorOpenList(this, this._baseTopRender)


            this.e_line_left = this.addChild(<UICompenent>this._baseTopRender.getComponent("e_line_vertical"));
            this.e_line_right = this.addChild(<UICompenent>this._baseTopRender.getComponent("e_line_vertical"));

      
 
            this.initView()

            this.uiLoadComplete = true
            this.refrishSize()

            this.showType = AppData.sceneEidtType
 
 
        }
 
 
        public set showType(value: number) {
            AppData.sceneEidtType = value
 
            if (this.uiLoadComplete) {

                switch (AppData.sceneEidtType) {
                    case 1:
                        this.setUiListVisibleByItem([this.a_scene_view], true)
                      //  this.setUiListVisibleByItem([this.e_centen_panel], true)
                        break
                    case 2:
                        this.setUiListVisibleByItem([this.a_scene_view], false)
                       // this.setUiListVisibleByItem([this.e_centen_panel], false)
                        break
                    default:
                        break
                }

            }

        }
 
        private a_scene_view: UICompenent
        private initView(): void {
            this._sceneViewRender.uiAtlas = this._tRender.uiAtlas
            this.a_scene_view = this.addChild(this._sceneViewRender.getComponent("a_scene_view"));
            TextureManager.getInstance().getTexture("res/white.jpg", ($texture: TextureRes) => {
                this._sceneViewRender.textureRes = $texture;
                Pan3d.me.TimeUtil.addFrameTick((t: number) => { this.upFrame(t) });
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

                var q: Pan3d.me.Quaternion = new Pan3d.me.Quaternion();
                q.fromMatrix(MainEditorProcessor.edItorSceneManager.cam3D.cameraMatrix);
                var m: Pan3d.me.Matrix3D = q.toMatrix3D()
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
        public suffix: string ="prefab|lyf|zzw|skill"
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

                if (drag.DragManager.dragSource.url.indexOf(".lyf") != -1) {
                    ModuleEventManager.dispatchEvent(new MainEditorEvent(MainEditorEvent.INPUT_LYF_TO_SCENE), obj)
                } 
                if (drag.DragManager.dragSource.url.indexOf(".skill") != -1) {
                    ModuleEventManager.dispatchEvent(new MainEditorEvent(MainEditorEvent.INPUT_SKILL_TO_SCENE), obj)
                } 
                if (drag.DragManager.dragSource.url.indexOf(".prefab") != -1) {
                    ModuleEventManager.dispatchEvent(new MainEditorEvent(MainEditorEvent.INPUT_PREFAB_TO_SCENE), obj)
                }
                if (drag.DragManager.dragSource.url.indexOf(".zzw") != -1) {
                    ModuleEventManager.dispatchEvent(new MainEditorEvent(MainEditorEvent.INPUT_ZZW_TO_SCENE), obj)
                }

              
            }
        }
  
        private upFrame(t: number): void {
       
            if (this.hasStage) {
                MainEditorProcessor.edItorSceneManager.textureRes = this._sceneViewRender.textureRes;
                var cam3D: Pan3d.me.Camera3D = MainEditorProcessor.edItorSceneManager.cam3D
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
  
   

            if (this.uiLoadComplete) {
                var roundNum: number = 1;
                this.a_scene_view.x = roundNum;
                this.a_scene_view.y = roundNum+22;
                this.a_scene_view.width = this.pageRect.width - roundNum * 2;
                this.a_scene_view.height = this.pageRect.height - roundNum * 2-20;

                if (this.e_centen_panel) {
                    this.e_centen_panel.x = 0
                    this.e_centen_panel.y = 0
                    this.e_centen_panel.width = this.pageRect.width;
                    this._baseMidRender.applyObjData();
              
                }

                this.e_line_left.x = 1;
                this.e_line_left.y = 0;
                this.e_line_left.height = this.pageRect.height;

                this.e_line_right.x = this.pageRect.width-3;
                this.e_line_right.y = 0;
                this.e_line_right.height = this.pageRect.height;

            }
            this.resize()
        }

  


    }

}

