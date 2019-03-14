﻿module popmodel {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    import UIManager = Pan3d.UIManager;
    import LoadManager = Pan3d.LoadManager;
    import Scene_data = Pan3d.Scene_data
    import ModuleEventManager = Pan3d.ModuleEventManager;

    export class PopModelShowEvent extends BaseEvent {
        public static SHOW_POP_MODEL_PANEL: string = "SHOW_LEFT_PANEL";  
        public static HIDE_POP_MODEL_PANEL: string = "HIDE_LEFT_PANEL";  
    }
    export class PopModelShowModule extends Module {
        public getModuleName(): string {
            return "PopModelShowModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new PopModelShowProcessor()];
        }
    }

    export class PopModelShowProcessor extends BaseProcessor {
        public getName(): string {
            return "PopModelShowProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof PopModelShowEvent) {
                var $leftEvent: PopModelShowEvent = <PopModelShowEvent>$event;

                if ($leftEvent.type == PopModelShowEvent.SHOW_POP_MODEL_PANEL) {
                    this.showLeftPanel();
                    this.readBaseModel();
                }
                if ($leftEvent.type == PopModelShowEvent.HIDE_POP_MODEL_PANEL) {
                    this.hideLeftPanel();
                }
            }
        }
        private readBaseModel(): void {
            LoadManager.getInstance().load(Scene_data.fileRoot + "objs/model_2_objs.txt", LoadManager.XML_TYPE,
                ($modelxml: string) => {
                    left.ModelShowModel.getInstance().readTxtToModelBy($modelxml)
                    ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
                });

        }
 
        private hideLeftPanel(): void {
            if (this.popModelShowPanel) {
                UIManager.getInstance().removeUIContainer(this.popModelShowPanel)
            }
        }
        private showLeftPanel(): void {
            if (!this.popModelShowPanel) {
                this.popModelShowPanel = new PopModelShowPanel
            }
            if (!this.popModelShowPanel.hasStage) {
                // UIManager.getInstance().addUIContainer(this.popModelShowPanel)
                var temp: layout.Panel = new layout.Panel(false)
                layout.LayerManager.getInstance().addPanel(temp, 500);
                temp.addUIContainer(this.popModelShowPanel);
            } 


        }
        private popModelShowPanel: PopModelShowPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new PopModelShowEvent(PopModelShowEvent.SHOW_POP_MODEL_PANEL),
                new PopModelShowEvent(PopModelShowEvent.HIDE_POP_MODEL_PANEL),


            ];
        }
    }
}