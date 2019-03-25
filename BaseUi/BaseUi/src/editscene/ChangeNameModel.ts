module editscene {
    import Panel = win.Panel;
 
    export class ChangeNameModel  {
        private static _instance: ChangeNameModel;
        public static getInstance(): ChangeNameModel {
            if (!this._instance) {
                this._instance = new ChangeNameModel();
            }
            return this._instance;
        }
        public constructor() {
            
        }
   
        private chatHtmlInput: HTMLInputElement;
        private setInputTxtPos(): void {
            if (!this.chatHtmlInput) {
                this.chatHtmlInput = <HTMLInputElement>document.createElement("input");
                this.chatHtmlInput.style.position = "absolute";
                this.chatHtmlInput.style["z-index"] = 100
                //this.chatHtmlInput.style.background = "transparent"
                this.chatHtmlInput.style.color = "#000000";
                document.body.appendChild(this.chatHtmlInput);
                this.chatHtmlInput.addEventListener("change", (cevt: any) => { this.changeInputTxt(cevt) });
            }
 
    
        }
        private changeInputTxt(evt: Event): void {
 
            this.changeBfun(this.chatHtmlInput.value);
            win.LayerManager.isHideMouseEvent = false;

            document.body.removeChild(this.chatHtmlInput);
            this.chatHtmlInput = null

        }
        private changeBfun: Function;
        public changeName(rect: Pan3d.Rectangle, str: string, bfun: Function): void {
            this.changeBfun = bfun;
            this.setInputTxtPos()
            win.LayerManager.isHideMouseEvent = true;
            this.chatHtmlInput.style.left = rect.x + "px";
            this.chatHtmlInput.style.top = rect.y + "px";
          
            this.chatHtmlInput.style.fontSize = String(12) + "px";
            this.chatHtmlInput.style.width = String(rect.width) + "px";
            this.chatHtmlInput.style.height = String(rect.height) + "px";

         
            this.chatHtmlInput.value = str
       
            this.chatHtmlInput.focus()
          
            

         
        }

    }
}