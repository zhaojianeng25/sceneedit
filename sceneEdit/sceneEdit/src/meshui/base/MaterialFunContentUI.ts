module prop {
    import TextureManager = Pan3d.TextureManager
    import Scene_data = Pan3d.Scene_data
    import InteractiveEvent = Pan3d.InteractiveEvent

   
    export class MaterialFunContentUI extends BaseReflComponent {
  
        protected textLabelUI: TextLabelUI;
        protected inputFunTextUi: InputFunTextUi;
        protected initView(): void {
            this.textLabelUI = new TextLabelUI(64, 16)
            this.propPanle.addBaseMeshUi(this.textLabelUI)

            this.inputFunTextUi = new InputFunTextUi(100, 30);
            this.propPanle.addBaseMeshUi(this.inputFunTextUi)


            this.height = 100;
        }
        public destory(): void {
            this.textLabelUI.destory()
            this.inputFunTextUi.destory();
            super.destory()

 
 
        }
        public resize(): void {

            super.resize()

            this.inputFunTextUi.width = this.width-20;
            this.inputFunTextUi.height = this.height-20;

            this.inputFunTextUi.resize();
        }

        public set data(value: any) {
            this._data = value;

        }
        public get data(): any {
            return this._data
        }
        public refreshViewValue(): void {
       

            var temp: materialui.NodeTreeFun = this.target[this.FunKey];
  
            this.inputFunTextUi.text = temp.funStr;


        }
        public set x(value: number) {
            this._x = value;
            this.textLabelUI.x = this._x + 0;
            this.inputFunTextUi.x = this._x + 0;
        }
        public get x(): number {
            return this._x
        }
        public set y(value: number) {
            this._y = value;
            this.textLabelUI.y = this._y
            this.inputFunTextUi.y = this._y+20
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