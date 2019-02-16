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
    import MaterialModelSprite = left.MaterialModelSprite
    import Panel = layout.Panel
    import EditSceneEvent = editscene.EditSceneEvent


    export class MainEditorEvent extends BaseEvent {
        public static INIT_MAIN_EDITOR_PANEL: string = "INIT_MAIN_EDITOR_PANEL"; //显示面板
        public static SHOW_MAIN_EDITOR_PANEL: string = "SHOW_MAIN_EDITOR_PANEL"; //显示面板
        public static HIDE_MAIN_EDITOR_PANEL: string = "HIDE_MAIN_EDITOR_PANEL"; //显示面板
 
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

               
                }
                if ($mainEditorEvent.type == MainEditorEvent.SHOW_MAIN_EDITOR_PANEL) {
                    if (!this._editScenePanel) {
                        this._editScenePanel = new MainEditorPanel();
                    }
                   
                    BaseUiStart.centenPanel.addUIContainer(this._editScenePanel);
                    //this.addEvents()
                }
                if ($mainEditorEvent.type == MainEditorEvent.HIDE_MAIN_EDITOR_PANEL) {
                    if (this._editScenePanel) {
                        BaseUiStart.centenPanel.removeUIContainer(this._editScenePanel);
                    }
                   // this.removeEvents()
                }

                this.changePageRect()
  
            }
            if ($event instanceof EditSceneEvent) {
                if ($event.type = EditSceneEvent.EDITE_SCENE_RESIZE) {
                    this.changePageRect()
                }
            }
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
            if ($e.buttons == 4) {
               
            }
       
        }
        private onMouseDown($e: MouseEvent): void {
   
            switch ($e.button) {
                case 0:
                    console.log("左键")
                    break
                case 1:
                    console.log("中键")
                    break
                case 2:
                    console.log("右键")
                    break
                default:
                    break
            }
        }
        private onMouseUp($e: MouseEvent): void {
        }
        private onKeyDown($e: KeyboardEvent): void {
        }
        private onKeyUp($e: KeyboardEvent): void {
        }
        
        public onMouseWheel($evt: MouseWheelEvent): void {
  
            if ($evt.x > BaseUiStart.leftPanel.width && $evt.x < BaseUiStart.rightPanel.x) {
                var $slectUi: UICompenent = layout.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y))
                if (!$slectUi ) {
                    MainEditorProcessor.edItorSceneManager.cam3D.distance += $evt.wheelDelta/10
                }
            }
         

        }
        private maseSceneManager(): void {
            MainEditorProcessor.edItorSceneManager = new EdItorSceneManager();
            Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
            MainEditorProcessor.edItorSceneManager.addDisplay(new Pan3d.GridLineSprite());
            MainEditorProcessor.edItorSceneManager.ready = true;

        
       

            MainEditorProcessor.edItorSceneManager.cam3D = new Pan3d.Camera3D();
            MainEditorProcessor.edItorSceneManager.cam3D.distance = 100;
            MainEditorProcessor.edItorSceneManager.focus3D.rotationY = 45;
            MainEditorProcessor.edItorSceneManager.focus3D.rotationX = -45;

            MathClass.getCamView(MainEditorProcessor.edItorSceneManager.cam3D, MainEditorProcessor.edItorSceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵

            ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.INIT_MOVE_SCALE_ROTATION), MainEditorProcessor.edItorSceneManager);
          
     
        }
     
        private changePageRect(): void {
            if (this._hierarchyListPanel && BaseUiStart.leftPanel) {
                var rect: Rectangle = new Rectangle(BaseUiStart.leftPanel.rect.x, BaseUiStart.leftPanel.rect.y, BaseUiStart.leftPanel.rect.width+10, BaseUiStart.leftPanel.rect.height);
                this._hierarchyListPanel.panelEventChanger(rect)
            }

            if (this._editScenePanel && BaseUiStart.centenPanel) {
                var rect: Rectangle = new Rectangle(BaseUiStart.centenPanel.rect.x, BaseUiStart.centenPanel.rect.y, BaseUiStart.centenPanel.rect.width -10, BaseUiStart.centenPanel.rect.height-5);
                this._editScenePanel.panelEventChanger(rect)
            }
        }
    
 
     
    
        private _hierarchyListPanel: HierarchyListPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new MainEditorEvent(MainEditorEvent.INIT_MAIN_EDITOR_PANEL),
                new MainEditorEvent(MainEditorEvent.SHOW_MAIN_EDITOR_PANEL),
                new MainEditorEvent(MainEditorEvent.HIDE_MAIN_EDITOR_PANEL),
                new EditSceneEvent(EditSceneEvent.EDITE_SCENE_RESIZE),

            ];
        }
    }
}