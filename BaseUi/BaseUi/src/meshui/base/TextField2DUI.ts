module prop {

    export class TextField2DUI extends BaseReflComponent {

        private textLabelUI: TextLabelUI;
        private infoLabelUi: TextLabelUI;

        protected initView(): void {
            this.textLabelUI = new TextLabelUI(128, 32);
            this.infoLabelUi = new TextLabelUI(128, 32);

            this.propPanle.addBaseMeshUi(this.textLabelUI)
            this.propPanle.addBaseMeshUi(this.infoLabelUi)


            this.height = 20
        }
        public destory(): void {
            this.textLabelUI.destory()
            this.infoLabelUi.destory()
        }
        public set data(value: any) {
            this._data = value;

        }
        public get data(): any {
            return this._data
        }
   
   
        public refreshViewValue(): void {

            this.infoLabelUi.label = this.target[this.FunKey]

        }
        public getNumStr(num: number): string {
            var n: number = Math.floor(num * 100) / 100;
            return n.toString();
        }
        public set x(value: number) {
            this._x = value;
            this.textLabelUI.x = this._x + 0;
            this.infoLabelUi.x = this._x + 75;
        }
        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value;
            this.textLabelUI.y = this._y
            this.infoLabelUi.y = this._y
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