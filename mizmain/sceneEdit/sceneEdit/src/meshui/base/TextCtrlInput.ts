﻿module prop {

    export class TextCtrlInput extends BaseReflComponent {

        private textLabelUI: TextLabelUI;
        private inputTextUi: InputTextUi;

 

        protected initView(): void {
            this.textLabelUI = new TextLabelUI();
            this.inputTextUi = new InputTextUi();
            this.propPanle.addBaseMeshUi(this.textLabelUI)
            this.propPanle.addBaseMeshUi(this.inputTextUi)
            this.inputTextUi.addEventListener(ReflectionEvet.CHANGE_DATA, this.onChangeInput, this)
            this.height = 20
        }
        public destory(): void {
            this.textLabelUI.destory()
            this.inputTextUi.destory()
        }
       
        public set visible(value: boolean) {


            this.inputTextUi.visible = value
        
           
      
        }
        public set data(value: any) {
            this._data = value;

        }
        public get data(): any {
            return this._data
        }
        private onChangeInput($evt: ReflectionEvet): void {
 
            this.target[this.FunKey] =  Number($evt.data);
            this.changFun && this.changFun(this);
            this.refreshViewValue();
               
          

        }
        public refreshViewValue(): void {
  
            this.inputTextUi.text = this.getNumStr(this.target[this.FunKey])

        }
        public getNumStr(num: number): string {
            return num.toString();
        }
        public set x(value: number) {
            this._x = value;
            this.textLabelUI.x = this._x + 0;
            this.inputTextUi.x = this._x + 75;
        }
        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value;
            this.textLabelUI.y = this._y
            this.inputTextUi.y = this._y+5
        }
        public get y(): number {
            return this._y
        }
        public get label(): string {
            return this._label;
        }
        public set label(value: string) {
            this._label = value
            this.textLabelUI.label = value;
        }
    }

}