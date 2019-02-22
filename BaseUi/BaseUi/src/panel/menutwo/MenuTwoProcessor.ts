module menutwo {
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
    import UIAtlas = Pan3d.UIAtlas
    import UIConatiner = Pan3d.UIConatiner

    import UIPanel = win.UIPanel
    import Panel = layout.Panel

    export class MenuTwoEvent extends BaseEvent {
        public static SHOW_RIGHT_MENU: string = "SHOW_RIGHT_MENU"; 
    }
    export class MenuTwoModule extends Module {
        public getModuleName(): string {
            return "MenuTwoModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new MenuTwoProcessor()];
        }
    }

    export class MenuTwoProcessor extends BaseProcessor {
        public getName(): string {
            return "MenuTwoProcessor";
        }
        private _MenuTwoPanel: MenuTwoPanel
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof MenuTwoEvent) {
                var $materialEvent: MenuTwoEvent = <MenuTwoEvent>$event;
               
                if ($materialEvent.type == MenuTwoEvent.SHOW_RIGHT_MENU) {
                    console.log("有键菜单")
                }
            
              
            }
        }
    
        private showMenuPanel(posv2d: Vector2D): void {
            if (!this._MenuTwoPanel) {
                this._MenuTwoPanel = new MenuTwoPanel()
            }
            this._MenuTwoPanel.left = posv2d.x / UIData.Scale;
            this._MenuTwoPanel.top = posv2d.y / UIData.Scale;
            this.addUIContainer(this._MenuTwoPanel);
            this._MenuTwoPanel.refrish()
            Scene_data.uiStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
        }
        private topMenuPanel: Panel;
        private addUIContainer(value: UIConatiner): void {
     
            if (!this.topMenuPanel) {
                this.topMenuPanel = new Panel(false)
                layout.LayerManager.getInstance().addPanel(this.topMenuPanel,200)
           
            }
            this.topMenuPanel.addUIContainer(value)
        }
        private removeUIContainer(value: UIConatiner): void {
            if (this.topMenuPanel) {
                this.topMenuPanel.removeUIContainer(value)
            }

        }
        public onMouseDown($evt: InteractiveEvent): void {

       
        
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
 
                new MenuTwoEvent(MenuTwoEvent.SHOW_RIGHT_MENU),
              
            ];
        }
    }

}