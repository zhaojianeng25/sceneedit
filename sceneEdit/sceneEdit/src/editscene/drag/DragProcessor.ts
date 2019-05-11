module drag {
    import BaseEvent = Pan3d.me.BaseEvent;
    import Module = Pan3d.me.Module;
    import Processor = Pan3d.me.Processor;
    import BaseProcessor = Pan3d.me.BaseProcessor;
    import Vector2D = Pan3d.me.Vector2D;
    import UIManager = Pan3d.me.UIManager;
    import UIData = Pan3d.me.UIData;
    import InteractiveEvent = Pan3d.me.InteractiveEvent;
    import Scene_data = Pan3d.me.Scene_data;
    import ModuleEventManager = Pan3d.me.ModuleEventManager;
    import UIAtlas = Pan3d.me.UIAtlas
    import UIConatiner = Pan3d.me.UIConatiner
    import UICompenent = Pan3d.me.UICompenent

    import UIPanel = win.UIPanel
    import Panel = win.Panel

 
    export class PanDragEvent extends BaseEvent {

        public static DRAG_SHOW: string = "DRAG_SHOW";
        public static DRAG_ENTER: string = "DRAG_ENTER";
        public static DRAG_DROP: string = "DRAG_DROP";

    }
    export class DragModule extends Module {
        public getModuleName(): string {
            return "DragModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new DragProcessor()];
        }
    }

    export class DragProcessor extends BaseProcessor {
        public getName(): string {
            return "DragProcessor";
        }
        private _dragPanel: DragPanel
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof PanDragEvent) {
                if ($event.type == PanDragEvent.DRAG_SHOW) {
                    if (!this._dragPanel) {
                        this._dragPanel = new DragPanel(64,64)
                    }
                    this.addUIContainer(this._dragPanel)
                    this._dragPanel.setData(DragManager.dragSource)
                    console.log("开始")
                }
             
            }
        }
        private topDrag: Panel;
        private addUIContainer(value: UIConatiner): void {

            if (!this.topDrag) {
                this.topDrag = new Panel();
                win.LayerManager.getInstance().addPanel(this.topDrag, 200)

            }
            this.topDrag.addUIContainer(value)
            this.addStageMoveEvets();
        }
        private addStageMoveEvets(): void {
 
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onUp, this);

        }
        private onMove($e: InteractiveEvent): void {
            var $ui: UICompenent = this.getObjectsUnderPoint(new Vector2D($e.x, $e.y))
            if ($ui) {
                $ui.dispatchEvent(new PanDragEvent(PanDragEvent.DRAG_DROP))
            }
 

            this._dragPanel.left = $e.x-32
            this._dragPanel.top = $e.y-32
        }
        private getObjectsUnderPoint(evt: Vector2D): UICompenent {
            var children: Array<Panel> = win.LayerManager.getInstance().children
        
            for (var i: number = children.length - 1; i >= 0; i--) {
                if (children[i] != this.topDrag) {
                    var temp: UICompenent = children[i].getObjectsUnderPoint(evt);
                    if (temp) {
                        return temp;
                    }
                }
             
            }
          
            return null
        }
        private onUp($e: InteractiveEvent): void {
           
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onUp, this);

            var $ui: UICompenent = this.getObjectsUnderPoint(new Vector2D($e.x, $e.y))
            if ($ui) {
                var tempEvent: PanDragEvent = new PanDragEvent(PanDragEvent.DRAG_ENTER)
                tempEvent.data = $e
                $ui.dispatchEvent(tempEvent)
            }
 
            this._dragPanel.left =10000
            this._dragPanel.top = 10000
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new PanDragEvent(PanDragEvent.DRAG_SHOW),
                new PanDragEvent(PanDragEvent.DRAG_DROP),
                new PanDragEvent(PanDragEvent.DRAG_ENTER),
          
            ];
        }
    }

}