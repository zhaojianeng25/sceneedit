module rightmenu {
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
   
    

    export class RightMenuEvent extends BaseEvent {
        public static INIT_RIGHT_MENU: string = "INIT_RIGHT_MENU";
        public static SHOW_RIGHT_MENU: string = "SHOW_RIGHT_MENU"; 
        public static HIDE_RIGHT_MENU: string = "HIDE_RIGHT_MENU";
        public static SHOW_COMBOX_MENU: string = "SHOW_COMBOX_MENU";

        public posv2d: Vector2D;
        public comboxData: Array<any>;
        public comboxFun: Function


    }
    export class RightMenuModule extends Module {
        public getModuleName(): string {
            return "RightMenuModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new RightMenuProcessor()];
        }
    }

    export class RightMenuProcessor extends BaseProcessor {
        public getName(): string {
            return "RightMenuProcessor";
        }
        private _rightMenuPanel: RightMenuPanel
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof RightMenuEvent) {
                var $materialEvent: RightMenuEvent = <RightMenuEvent>$event;
                if ($materialEvent.type == RightMenuEvent.INIT_RIGHT_MENU) {
                    ComboBoxMenuPanel.baseUIAtlas = new UIAtlas()
                    ComboBoxMenuPanel.baseUIAtlas.setInfo("ui/rightmenu/rightmenu.txt", "ui/rightmenu/rightmenu.png", () => { });
                }
                if ($materialEvent.type == RightMenuEvent.SHOW_RIGHT_MENU) {
                    this.showMenuPanel($materialEvent.posv2d)
                }
                if ($materialEvent.type == RightMenuEvent.HIDE_RIGHT_MENU) {
                    if (this._rightMenuPanel) {
                        Scene_data.uiStage.removeEventListener(InteractiveEvent.Down, this.onMouseDown, this);
                        this.removeUIContainer(this._rightMenuPanel)
                    }
                   
                }
                if ($materialEvent.type == RightMenuEvent.SHOW_COMBOX_MENU) {
                    this.showComboBoxMenuPanel($materialEvent)
                }
            }
        }
        private addEvents(): void {
            /*
            document.addEventListener("contextmenu", (event: any) => {
                event.preventDefault();
                var $rightMenuEvet: RightMenuEvent = new RightMenuEvent(RightMenuEvent.SHOW_RIGHT_MENU);
                $rightMenuEvet.posv2d = new Vector2D(event.clientX, event.clientY)
                ModuleEventManager.dispatchEvent($rightMenuEvet);

            });
            */

        

        }
        private _comboBoxMenuPanel: ComboBoxMenuPanel
        private showComboBoxMenuPanel(evt:RightMenuEvent): void {
            if (!this._comboBoxMenuPanel) {
                this._comboBoxMenuPanel = new ComboBoxMenuPanel()
            }
            var posv2d: Vector2D = evt.posv2d;
            this._comboBoxMenuPanel.left = posv2d.x / UIData.Scale;
            this._comboBoxMenuPanel.top = posv2d.y / UIData.Scale;
            this._comboBoxMenuPanel.showComboBoxList(evt.comboxData, evt.comboxFun)
            UIManager.getInstance().addUIContainer(this._comboBoxMenuPanel);

        }

        private showMenuPanel(posv2d: Vector2D): void {
            if (!this._rightMenuPanel) {
                this._rightMenuPanel = new RightMenuPanel()
            }
            this._rightMenuPanel.left = posv2d.x / UIData.Scale;
            this._rightMenuPanel.top = posv2d.y / UIData.Scale;
            this.addUIContainer(this._rightMenuPanel);
            this._rightMenuPanel.refrish()
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
            ModuleEventManager.dispatchEvent(new RightMenuEvent(RightMenuEvent.HIDE_RIGHT_MENU));
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new RightMenuEvent(RightMenuEvent.INIT_RIGHT_MENU),
                new RightMenuEvent(RightMenuEvent.SHOW_RIGHT_MENU),
                new RightMenuEvent(RightMenuEvent.HIDE_RIGHT_MENU),
                new RightMenuEvent(RightMenuEvent.SHOW_COMBOX_MENU),
            ];
        }
    }

}