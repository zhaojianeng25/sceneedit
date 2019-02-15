module maineditor {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    import UIManager = Pan3d.UIManager;
    import ModuleEventManager = Pan3d.ModuleEventManager;
    import UIConatiner = Pan3d.UIConatiner
    import Rectangle = Pan3d.Rectangle

    import Panel = layout.Panel
    import EditSceneEvent = editscene.EditSceneEvent

    export class MainEditorEvent extends BaseEvent {
        public static INIT_MAIN_EDITOR_PANEL: string = "INIT_MAIN_EDITOR_PANEL"; //显示面板
 
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
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof MainEditorEvent) {
                var $leftEvent: MainEditorEvent = <MainEditorEvent>$event;
                if ($leftEvent.type == MainEditorEvent.INIT_MAIN_EDITOR_PANEL) {
                    if (!this._hierarchyListPanel) {
                        this._hierarchyListPanel = new HierarchyListPanel();
                    }
                    BaseUiStart.leftPanel.addUIContainer(this._hierarchyListPanel);
                    this.changePageRect()
                 
                }
  
            }
            if ($event instanceof EditSceneEvent) {
                if ($event.type = EditSceneEvent.EDITE_SCENE_RESIZE) {
                    this.changePageRect()
                }
            }
        }
        private changePageRect(): void {
            if (this._hierarchyListPanel && BaseUiStart.leftPanel) {
                var rect: Rectangle = new Rectangle(BaseUiStart.leftPanel.rect.x, BaseUiStart.leftPanel.rect.y, BaseUiStart.leftPanel.rect.width+10, BaseUiStart.leftPanel.rect.height);
                this._hierarchyListPanel.panelEventChanger(rect)
            }
        }
    
 
     
    
        private _hierarchyListPanel: HierarchyListPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new MainEditorEvent(MainEditorEvent.INIT_MAIN_EDITOR_PANEL),
                new EditSceneEvent(EditSceneEvent.EDITE_SCENE_RESIZE),

            ];
        }
    }
}