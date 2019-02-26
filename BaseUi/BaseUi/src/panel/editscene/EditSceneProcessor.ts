module editscene {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    import Vector2D = Pan3d.Vector2D;
    import UIManager = Pan3d.UIManager;
    import UIData = Pan3d.UIData;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Scene_data = Pan3d.Scene_data;
    import ModuleEventManager = Pan3d.ModuleEventManager;
    import UIConatiner = Pan3d.UIConatiner
    import Panel=layout.Panel
    import FileListPanel = filelist.FileListPanel
 
    import OssFolderPanel = ossfolder.OssFolderPanel;



    export class EditSceneEvent extends BaseEvent {
        public static SHOW_EDITSCENE_PANEL: string = "SHOW_EDITSCENE_PANEL";
        public static LEFT_LINE_MOVE: string = "LEFT_LINE_MOVE";
        public static EDITE_SCENE_RESIZE: string = "EDITE_SCENE_RESIZE";
 

    }
    export class EditSceneModule extends Module {
        public getModuleName(): string {
            return "EditSceneModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new EditSceneProcessor()];
        }
    }

    export class EditSceneProcessor extends BaseProcessor {
        public getName(): string {
            return "EditSceneProcessor";
        }
        private _editScenePanel: EditScenePanel
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof EditSceneEvent) {
                var $editSceneEvent: EditSceneEvent = <EditSceneEvent>$event;
                if ($editSceneEvent.type == EditSceneEvent.SHOW_EDITSCENE_PANEL) {
 
                    this._editScenePanel = new EditScenePanel
         
                    this._editScenePanel.x = 300
                    this._editScenePanel.y = 300
                    this._editScenePanel.width = 450
                    this._editScenePanel.height = 500
                    layout.LayerManager.getInstance().addPanel(this._editScenePanel,100)
                }
                if ($editSceneEvent.type == EditSceneEvent.LEFT_LINE_MOVE) {

                    this._editScenePanel.resize();
                }
            }
        }
 
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new EditSceneEvent(EditSceneEvent.SHOW_EDITSCENE_PANEL),
                new EditSceneEvent(EditSceneEvent.LEFT_LINE_MOVE),
            ];
        }
    }

}