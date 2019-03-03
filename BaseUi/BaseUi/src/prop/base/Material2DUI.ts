module prop {
    import TextureManager = Pan3d.TextureManager
    import Scene_data = Pan3d.Scene_data
    import Material = Pan3d.Material
   
    export class Material2DUI extends Texturue2DUI {
        private textureTree: materialui.MaterialTree
        protected initView(): void {
            super.initView();
            this.height =300
        }
        public destory(): void {
            super.destory()
            if (this._materialTreeMc) {
                this._materialTreeMc.destory()
                this._materialTreeMc = null
            }
        }
        public set data(value: any) {
            this._data = value;
          //  console.log("data", value)

        }
        public refreshViewValue(): void {


            this.textureTree = this.target[this.FunKey]
            if (this.textureTree) {

               // console.log(this.textureTree.data)

                this.texturePicUi.url = this.textureTree.url
                var $arr: Array<string> = this.textureTree.url.split("/");
                this.textureUrlText.label = $arr[$arr.length - 1];

                this.showMaterialParamUi();
            } else {
                this.texturePicUi.url = "icon/base.jpg"
                this.textureUrlText.label = "无材质"
            }
 
        }
        private _materialTreeMc: MaterialParamUi
        private   showMaterialParamUi(): void {
            if (!this._materialTreeMc) {
                this.  _materialTreeMc = new MaterialParamUi
            }
            this.textureTree = this.target[this.FunKey]
            this._materialTreeMc.setData(this.textureTree, this.target.prefabStaticMesh)
            this._materialTreeMc.y = this._y + 100



            this.height = 100 + this._materialTreeMc.height
           
           
        }
    
    }

}