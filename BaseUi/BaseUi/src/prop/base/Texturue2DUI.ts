module prop {
    import TextureManager = Pan3d.TextureManager
    import Scene_data = Pan3d.Scene_data
    export class Texturue2DUI extends BaseReflComponent {

        protected textLabelUI: TextLabelUI;
        protected textureUrlText: TextLabelUI;
        protected texturePicUi: TexturePicUi
     

        private _label: string

        protected initView(): void {
            this.textLabelUI = new TextLabelUI(64, 16)
            this.textureUrlText = new TextLabelUI(128,16)
            this.texturePicUi = new TexturePicUi()
     
            this.texturePicUi.addEventListener(ReflectionEvet.CHANGE_DATA, this.onChangePicurl, this)
            this.height = 100
        }

        private onChangePicurl($evt: ReflectionEvet): void {
            this.makeNewTextureByFile($evt.data);

        }
        private makeNewTextureByFile(simpleFile: File): void {
            var reader = new FileReader();
            reader.readAsDataURL(simpleFile);
            reader.onload = () => {
                var img: any = makeImage()
                img.onload = () => {
                    TextureManager.getInstance().addImgRes(Scene_data.fileRoot + simpleFile.name, img);
                    this.target[this.FunKey] = simpleFile.name
                    this.refreshViewValue()
                }
                img.src = reader.result;
                
            }

         
        }
        public destory(): void {
            this.textLabelUI.destory()
            this.textureUrlText.destory()
            this.texturePicUi.destory()
    
        }
        public set data(value: any) {
            this._data = value;

        }
        public get data(): any {
            return this._data
        }

        public refreshViewValue(): void {

            var $url: string = String(this.target[this.FunKey]);
            this.texturePicUi.url = $url

            var $arr: Array<string> = $url.split("/");
            this.textureUrlText.label = $arr[$arr.length - 1];
    
        }
        public set x(value: number) {
            this._x = value;
            this.textLabelUI.x = this._x + 0;
            this.texturePicUi.x = this._x + 60;
            this.textureUrlText.x=this._x+60

        }
        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value;
            this.textLabelUI.y = this._y
            this.texturePicUi.y = this._y 
            this.textureUrlText.y = this._y+75
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
        private _suffix: string
        public get suffix(): string {
            return this._suffix;
        }
        public set suffix(value: string) {
            this._suffix = value
            this.texturePicUi.suffix = value
 
        }
        
    }

 

}