module prop {
     
 
 

    export class MeshMaterialLfetView2DUI extends MeshSceneView2DUI {

 
        public set x(value: number) {
            this._x = value;
            this.textLabelUI.x = this._x + 100000;
            this.texturePicUi.x = this._x + 10;
            this.textureUrlText.x = this._x + 10000

        }
        public constructor(value: UiMeshSprite) {
            super(value);
            this.showSprite = new left.MaterialModelSprite ();
            this.sceneManager.addDisplay(this.showSprite);
        }
        private showSprite: left.MaterialModelSprite ;
        public refreshViewValue(): void {
            var temp : materialui.MaterialTree = this.target[this.FunKey];
            this.texturePicUi.url = "icon/base.jpg";

            pack.PackObjDataManager.getInstance().getObjDataByUrl("pefab/模型/球/球.objs", (value: ObjData) => {
                this.showSprite.objData = value;
            })
            this.showSprite.material = temp;
 
        }
       

    }



}