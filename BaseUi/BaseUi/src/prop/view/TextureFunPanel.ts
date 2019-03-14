module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent
    export class TextureFunPanel extends base.BaseWindow {
 
        protected loadConfigCom(): void {
            super.loadConfigCom();

            this.setUiListVisibleByItem([this.a_scroll_bar_bg], false)
            this.setUiListVisibleByItem([this.b_win_close], true)

           
 
        }
        private chatHtmlInput: HTMLTextAreaElement;
        private setInputTxtPos(): void {
            if (!this.chatHtmlInput) {
                this.chatHtmlInput = document.createElement("textarea")
                this.chatHtmlInput.style.position = "absolute";
                this.chatHtmlInput.style["z-index"] = 100
                this.chatHtmlInput.style.background = "transparent"
                this.chatHtmlInput.style.color = "#ffffff";
                document.body.appendChild(this.chatHtmlInput);
                this.chatHtmlInput.addEventListener("change", (cevt: any) => { this.changeFile(cevt) });
            }

            this.chatHtmlInput.style.left = 0 + "px";
            this.chatHtmlInput.style.top = 0 + "px";


            var tw: number = 350
            var th: number = 40;
            var textSize: number = 100
            this.chatHtmlInput.style.fontSize = String(12) + "px";
            this.chatHtmlInput.style.width = String(tw) + "px";
            this.chatHtmlInput.style.height = String(th) + "px";
            this.chatHtmlInput.value = (<materialui.NodeTreeFun>this.mathFunNodeUI.nodeTree).funStr

            this.resize();

          
        }
        protected butClik(evt: InteractiveEvent): void {

            if (evt.target == this.b_win_close) {
                this.hidePanel();
            }
        }
        public resize(): void {
            super.resize()
            if (this.chatHtmlInput) {
                this.chatHtmlInput.style.left = this.left+5 + "px";
                this.chatHtmlInput.style.top = this.top + 25 + "px";

                this.chatHtmlInput.style.width = this.pageRect.width-8 + "px";
                this.chatHtmlInput.style.height = this.pageRect.height-30 + "px";
            }
        }
        
        private changeFile(evt: any): void {
            
            var $agalStr: string = this.chatHtmlInput.value
            if (materialui.NodeTreeFun.isNeedChangePanel($agalStr, (<materialui.NodeTreeFun>this.mathFunNodeUI.nodeTree).funStr)) {
                this.mathFunNodeUI.inPutFunStr($agalStr)
            } else {
                (<materialui.NodeTreeFun>this.mathFunNodeUI.nodeTree).funStr = $agalStr
                this.changeData();
            }
 
        }
        private changeData(): void {
            Pan3d.  ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
        }
        private static _instance: TextureFunPanel;
        public static getInstance(): TextureFunPanel {
            if (!this._instance) {
                this._instance = new TextureFunPanel();
            }
            return this._instance;
        }
        private layaPanel: layout.Panel
        private mathFunNodeUI: materialui.MathFunNodeUI;
        public constructor() {
            super();
            this.layaPanel = new layout.Panel(false)
            layout.LayerManager.getInstance().addPanel(this.layaPanel, 501);
    ;
        }
        public showPanel(value: materialui.MathFunNodeUI): void {
            this.mathFunNodeUI = value
            this.layaPanel.addUIContainer(this)
            this.setInputTxtPos()

            
        }
        public hidePanel(): void {
            if (this.chatHtmlInput) {
                this.chatHtmlInput.removeEventListener("change", (cevt: any) => { this.changeFile(cevt) });
                document.body.removeChild(this.chatHtmlInput);
                this.chatHtmlInput = null
            }
            this.layaPanel.removeUIContainer(this)
        }
        
    }
}