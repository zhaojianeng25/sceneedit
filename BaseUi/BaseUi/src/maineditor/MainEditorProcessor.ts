module maineditor {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    import UIManager = Pan3d.UIManager;
    import ModuleEventManager = Pan3d.ModuleEventManager;
    import UIConatiner = Pan3d.UIConatiner
    import Rectangle = Pan3d.Rectangle
    import MouseType = Pan3d.MouseType
    import UICompenent = Pan3d.UICompenent
    import MathClass = Pan3d.MathClass
    import KeyboardType = Pan3d.KeyboardType
    import MaterialModelSprite = left.MaterialModelSprite
    import Panel = layout.Panel
    import EditSceneEvent = editscene.EditSceneEvent


    export class MainEditorEvent extends BaseEvent {
        public static LOAD_SCENE_MAP: string = "LOAD_SCENE_MAP";  
        public static INIT_MAIN_EDITOR_PANEL: string = "INIT_MAIN_EDITOR_PANEL";  
        public static SHOW_MAIN_EDITOR_PANEL: string = "SHOW_MAIN_EDITOR_PANEL";  
        public static INPUT_PREFAB_TO_SCENE: string = "INPUT_PREFAB_TO_SCENE";  
        public static SAVE_SCENE_MAP_TO_SEVER: string = "SAVE_SCENE_MAP_TO_SEVER";  
        public static CLEAR_SCENE_MAP_ALL: string = "CLEAR_SCENE_MAP_ALL";  
        public static SHOW_SCENE_POJECT_MESH_VIEW: string = "SHOW_SCENE_POJECT_MESH_VIEW";  
        public static SCENE_SELECT_SPRITE_DOWN: string = "SCENE_SELECT_SPRITE_DOWN";   //选取舞台物件
  
 
    }
    export class MainEditorModule extends Module {
        public getModuleName(): string {
            return "MainEditorModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new MainEditorProcessor()];
        }
    }

    export class MainEditorProcessor extends BaseProcessor {
        public getName(): string {
            return "MainEditorProcessor";
        }
        private _editScenePanel: MainEditorPanel;
        public static edItorSceneManager: EdItorSceneManager
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof MainEditorEvent) {
                var $mainEditorEvent: MainEditorEvent = <MainEditorEvent>$event;
                if ($mainEditorEvent.type == MainEditorEvent.INIT_MAIN_EDITOR_PANEL) {
                    this.maseSceneManager()
                    if (!this._hierarchyListPanel) {
                        this._hierarchyListPanel = new HierarchyListPanel();
                    }
                    BaseUiStart.leftPanel.addUIContainer(this._hierarchyListPanel);

                    this.addEvents()
               
                }
                if ($mainEditorEvent.type == MainEditorEvent.SHOW_MAIN_EDITOR_PANEL) {
                    if (!this._editScenePanel) {
                        this._editScenePanel = new MainEditorPanel();
                    }
                     BaseUiStart.centenPanel.addUIContainer(this._editScenePanel);
                    Pan3d.ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.INIT_UICONTAINER_TO_XYZ), this._editScenePanel)
                    topMenu.EditTopMenuPanel.getInstance().makeSceneTopMenu()
 
                }
                if ($mainEditorEvent.type == MainEditorEvent.INPUT_PREFAB_TO_SCENE) {

                    this._hierarchyListPanel.inputPrefabToScene($mainEditorEvent.data)
                }
                if ($mainEditorEvent.type == MainEditorEvent.SHOW_SCENE_POJECT_MESH_VIEW) {


                    this.showScnePojectView($mainEditorEvent.data);
                 
                }
                if ($mainEditorEvent.type == MainEditorEvent.LOAD_SCENE_MAP) {

                    this._hierarchyListPanel.readMapFile();
                }


                if ($mainEditorEvent.type == MainEditorEvent.SAVE_SCENE_MAP_TO_SEVER) {

                    this._hierarchyListPanel.saveMap()
                }
                if ($mainEditorEvent.type == MainEditorEvent.CLEAR_SCENE_MAP_ALL) {


                    while (maineditor.EditorModel.getInstance().fileItem.length) {
                        maineditor.EditorModel.getInstance().selectItem =[ maineditor.EditorModel.getInstance().fileItem[0]]
                        maineditor.EditorModel.getInstance().deleSelectItem()
                    }
                
                }
                if ($mainEditorEvent.type == MainEditorEvent.SCENE_SELECT_SPRITE_DOWN) {

           
                    var tempItem: Array<FolderMeshVo> = EditorModel.getInstance().selectModel(new Vector2D($event.data.x - MainEditorProcessor.edItorSceneManager.cam3D.cavanRect.x, $event.data.y - MainEditorProcessor.edItorSceneManager.cam3D.cavanRect.y))
                    this._hierarchyListPanel.selectModelEvet(tempItem, $event.data.mouseEvent.shiftKey)
                }


                this.changePageRect()
  
            }
            if ($event instanceof EditSceneEvent) {
                if ($event.type = EditSceneEvent.EDITE_SCENE_RESIZE) {
                    this.changePageRect()
                }
            }
        }
        private scenePojectMapData: any;
        private showScnePojectView(value: any): void {
            if (value) {
                this.scenePojectMapData = value
            }
            var _cenePojectMeshView: ScenePojectMeshView= new ScenePojectMeshView;
            _cenePojectMeshView.data  =   this.scenePojectMapData;
            prop.PropModel.getInstance().showPefabMesh(_cenePojectMeshView);
            prop.PropModel.getInstance().resize();

            filemodel.MaterialManager.getInstance().getMaterialByUrl("texture/cctv.material", ($materialTree: materialui.MaterialTree) => {
                _cenePojectMeshView.texture = $materialTree;
           
            })
 

        }
   
        private onMouseWheelFun: any;
        private onMouseDownFun: any;
        private onMouseMoveFun: any;
        private onMouseUpFun: any;
        private onKeyDownFun: any;
        private onKeyUpFun: any;
        private addEvents(): void {
            if (!this.onMouseWheelFun) {
                this.onMouseWheelFun = ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) };
                this.onMouseDownFun = ($evt: MouseEvent) => { this.onMouseDown($evt) };
                this.onMouseMoveFun = ($evt: MouseEvent) => { this.onMouseMove($evt) };
                this.onMouseUpFun = ($evt: MouseEvent) => { this.onMouseUp($evt) };
                this.onKeyDownFun = ($evt: KeyboardEvent) => { this.onKeyDown($evt) };
                this.onKeyUpFun = ($evt: KeyboardEvent) => { this.onKeyUp($evt) };
            }
            document.addEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
            document.addEventListener(MouseType.MouseDown, this.onMouseDownFun);
            document.addEventListener(MouseType.MouseMove, this.onMouseMoveFun);
            document.addEventListener(MouseType.MouseUp, this.onMouseUpFun);
            document.addEventListener(MouseType.KeyDown, this.onKeyDownFun)
            document.addEventListener(MouseType.KeyUp, this.onKeyUpFun)

            document.addEventListener("contextmenu", (event: any) => {
                event.preventDefault();
            });


        }
        private removeEvents(): void {
            document.removeEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
            document.removeEventListener(MouseType.MouseDown, this.onMouseDownFun);
            document.removeEventListener(MouseType.MouseMove, this.onMouseMoveFun);
            document.removeEventListener(MouseType.MouseUp, this.onMouseUpFun);
            document.removeEventListener(MouseType.KeyDown, this.onKeyDownFun)
            document.removeEventListener(MouseType.KeyUp, this.onKeyUpFun)
        }
        private onMouseMove($e: MouseEvent): void {
           
       
        }
        private onMouseDown($e: MouseEvent): void {
            if (this.isCanToDo) {

            
            }
   
         
        }
        private onMouseUp($e: MouseEvent): void {
        }
        private get hasStage(): boolean { //false为可以操作
            if (this._hierarchyListPanel.hasStage) {
                return true;
            } else {
                return false;
            }


        }
        private onKeyDown($evt: KeyboardEvent): void {
            if (!this.hasStage) {
                return
            } else {
                switch ($evt.keyCode) {

                    case KeyboardType.Delete:
                        console.log("删除选取")

                        maineditor.EditorModel.getInstance().keyDeleSelectItem()
                  
                        break
                    case KeyboardType.S:
                        break
                }
            }
 

        }
        private onKeyUp($e: KeyboardEvent): void {
        }
        private get isCanToDo(): boolean { //不能操作
            if (this._editScenePanel.hasStage) {
                return true;
            } else {
                return false;
            }

        }
        public onMouseWheel($evt: MouseWheelEvent): void {
            if (!this.isCanToDo) {
                return
            }
       
        }
        private maseSceneManager(): void {
            MainEditorProcessor.edItorSceneManager = new EdItorSceneManager();
            Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
            MainEditorProcessor.edItorSceneManager.addDisplay(new Pan3d.GridLineSprite());
            MainEditorProcessor.edItorSceneManager.ready = true;

        
       

            MainEditorProcessor.edItorSceneManager.cam3D = new Pan3d.Camera3D();
            MainEditorProcessor.edItorSceneManager.cam3D.distance = 100;
            MainEditorProcessor.edItorSceneManager.focus3D.rotationY = 0;
            MainEditorProcessor.edItorSceneManager.focus3D.rotationX = -45;

            MathClass.getCamView(MainEditorProcessor.edItorSceneManager.cam3D, MainEditorProcessor.edItorSceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵

            ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.INIT_MOVE_SCALE_ROTATION), MainEditorProcessor.edItorSceneManager);
          
     
        }
     
        private changePageRect(): void {
            if (this._hierarchyListPanel && BaseUiStart.leftPanel) {
           
                    var rect: Rectangle = new Rectangle(BaseUiStart.leftPanel.rect.x, BaseUiStart.leftPanel.rect.y, BaseUiStart.leftPanel.rect.width, BaseUiStart.leftPanel.rect.height);
                    this._hierarchyListPanel.setRect(rect)
                
    
            }
 
            if (this._editScenePanel && BaseUiStart.centenPanel) {
                var rect: Rectangle = new Rectangle(BaseUiStart.centenPanel.rect.x, BaseUiStart.centenPanel.rect.y, BaseUiStart.centenPanel.rect.width , BaseUiStart.centenPanel.rect.height);
                this._editScenePanel.panelEventChanger(rect)
            }
        }
    

        private _hierarchyListPanel: HierarchyListPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new MainEditorEvent(MainEditorEvent.INIT_MAIN_EDITOR_PANEL),
                new MainEditorEvent(MainEditorEvent.SHOW_MAIN_EDITOR_PANEL),
                new MainEditorEvent(MainEditorEvent.INPUT_PREFAB_TO_SCENE),
                new MainEditorEvent(MainEditorEvent.SAVE_SCENE_MAP_TO_SEVER),
                new MainEditorEvent(MainEditorEvent.SCENE_SELECT_SPRITE_DOWN),
                new MainEditorEvent(MainEditorEvent.CLEAR_SCENE_MAP_ALL),
                new MainEditorEvent(MainEditorEvent.SHOW_SCENE_POJECT_MESH_VIEW),
                new MainEditorEvent(MainEditorEvent.LOAD_SCENE_MAP),
                new EditSceneEvent(EditSceneEvent.EDITE_SCENE_RESIZE),
                
            ];
        }
    }
}