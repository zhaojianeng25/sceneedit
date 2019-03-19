module editscene {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
 


    export class EditSceneEvent extends BaseEvent {
        public static SHOW_EDITSCENE_PANEL: string = "SHOW_EDITSCENE_PANEL";
 
        public static EDITE_SCENE_RESIZE: string = "EDITE_SCENE_RESIZE";

        public static SHOW_HIDE_EDIT_TEMP_PANEL: string = "SHOW_HIDE_EDIT_TEMP_PANEL";
 

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
                    win.LayerManager.getInstance().addPanel(this._editScenePanel, 100)

                }
            }
        }
     
 
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new EditSceneEvent(EditSceneEvent.SHOW_EDITSCENE_PANEL),
                new EditSceneEvent(EditSceneEvent.SHOW_HIDE_EDIT_TEMP_PANEL),
 
            ];
        }
    }

}