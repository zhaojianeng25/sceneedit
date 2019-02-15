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

                    ModuleEventManager.dispatchEvent(new MainEditorEvent(MainEditorEvent.SHOW_MAIN_EDITOR_PANEL));
                }
                if ($mainEditorEvent.type == MainEditorEvent.SHOW_MAIN_EDITOR_PANEL) {
                    if (!this._editScenePanel) {
                        this._editScenePanel = new MainEditorPanel();
                    }
                    BaseUiStart.editType =0
                    BaseUiStart.centenPanel.addUIContainer(this._editScenePanel);
                    this.addEvents()
                }
                if ($mainEditorEvent.type == MainEditorEvent.HIDE_MAIN_EDITOR_PANEL) {
                    if (this._editScenePanel) {
                        BaseUiStart.centenPanel.removeUIContainer(this._editScenePanel);
                    }
                    this.removeEvents()
                }

                this.changePageRect()
  
            }
            if ($event instanceof EditSceneEvent) {
                if ($event.type = EditSceneEvent.EDITE_SCENE_RESIZE) {
                    this.changePageRect()
                }
            }
        }
        private addEvents(): void {
            document.addEventListener(MouseType.MouseWheel, ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) });
        }
        private removeEvents(): void {
            document.removeEventListener(MouseType.MouseWheel, ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) });
        }
        public onMouseWheel($evt: MouseWheelEvent): void {
            if (BaseUiStart.editType == 0) {
                if ($evt.x > BaseUiStart.leftPanel.width && $evt.x < BaseUiStart.rightPanel.x) {
                    var $slectUi: UICompenent = layout.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y))
                    if (!$slectUi ) {

                        MainEditorProcessor.edItorSceneManager.cam3D.distance += $evt.wheelDelta/10
                        console.log(MainEditorProcessor.edItorSceneManager.cam3D.distance)
                    }
                }
            }

        }
        private maseSceneManager(): void {
            MainEditorProcessor.edItorSceneManager = new EdItorSceneManager();
            Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
            MainEditorProcessor.edItorSceneManager.addDisplay(new Pan3d.GridLineSprite());
            MainEditorProcessor.edItorSceneManager.ready = true;

            this.modelSprite = new MaterialModelSprite();
            var a: Pan3d.BaseDiplay3dSprite = new Pan3d.BaseDiplay3dSprite

            MainEditorProcessor.edItorSceneManager.cam3D = new Pan3d.Camera3D()
            MainEditorProcessor.edItorSceneManager.cam3D.distance = 200
            MainEditorProcessor.edItorSceneManager.addDisplay(a);
     
        }
        private modelSprite: MaterialModelSprite;
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