module win {
    import UIRenderComponent = Pan3d.me.UIRenderComponent
    import UIConatiner = Pan3d.me.UIConatiner
    export class UIPanelEvent extends Pan3d.me.BaseEvent {
        public static DISPOSE_PANEL_EVENT: string = "dispose_panel_event";
        public panel: UIPanel
    }
    export  class UIPanel extends UIConatiner {

        private _disposeEventFun: Function;
        public constructor() {
            super();
        }

        public onAdd(): void {
            if (this._disposeEventFun) {
                Pan3d.me.TimeUtil.removeTimeOut(this._disposeEventFun);
            }
        }

        public onRemove(): void {
            if (!this._disposeEventFun) {
                this._disposeEventFun = () => {
                    var evt: UIPanelEvent = new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT);
                    evt.panel = this;
                    Pan3d.me.ModuleEventManager.dispatchEvent(evt);
                }
            }
            Pan3d.me.TimeUtil.addTimeOut(20000000, this._disposeEventFun);
        }
        public addRender($uiRender: UIRenderComponent): void {
            var index: number = this.renderList.indexOf($uiRender);
            if (index != -1) {
                return;
            }
            $uiRender.container = this;
            $uiRender.sortnum = this.layer;
            this.renderList.push($uiRender);
            if (this.hasStage) {
                this.perent.addUI($uiRender);
            }
        }
        public removeRender($uiRender: UIRenderComponent): void {
            var index: number = this.renderList.indexOf($uiRender);
            if (index != -1) {
                this.renderList.splice(index, 1);
            } else {
                return;
            }
            if (this.hasStage) {
                this.perent.removeUI($uiRender);
            }
        }
    }

}