module prop {
     
 
 

    export class MeshMaterialLfetView2DUI extends MeshSceneView2DUI {

 
        public set x(value: number) {
            this._x = value;
            this.textLabelUI.x = this._x + 100000;
            this.texturePicUi.x = this._x + 10;
            this.textureUrlText.x = this._x + 10000

            this.resize()
        }
        public resize(): void {

            if (this._width && this.texturePicUi) {
                this._x = (this._width - 200) / 2;
                this.texturePicUi.x = this._x;
                this.texturePicUi.y = this._y+5
 
            }
        
  
        }
        protected texturePicUiChange($evt: ReflectionEvet): void {



            var temp: materialui.MaterialTree = this.target[this.FunKey];
            temp.showurl = this.texturePicUi.url

            this.refrishShowMaterialModel(temp)
 



            



        }
        private refrishShowMaterialModel(material: materialui.MaterialTree): void {
            var fileUrl: string = material.showurl;
            if (!fileUrl) {
                fileUrl = "pefab/模型/球/球.objs"
            }
            var tempArr: Array<string> = fileUrl.split(".")
            var stuffstr: string = tempArr[tempArr.length - 1]

            switch (stuffstr) {
                case "prefab":
                    pack.PackPrefabManager.getInstance().getPrefabByUrl(fileUrl, (prefabStaticMesh: pack.PrefabStaticMesh) => {
                        this.setObjUrlToSprite(prefabStaticMesh.objsurl)
                    })

                    break;
                case "objs":

                    this.setObjUrlToSprite(fileUrl)


                    break;

                default:
                    console.log("没有处理的类型", stuffstr)
                    break
            }
        }
        public set width(value: number) {
            this._width = value;
            this.resize()
        }

        public constructor(value: UiMeshSprite) {
            super(value);
            this.showSprite = new left.MaterialModelSprite ();
            this.sceneManager.addDisplay(this.showSprite);
        }
        private setObjUrlToSprite(objurl: string): void {
            pack.PackObjDataManager.getInstance().getObjDataByUrl(objurl, (value: ObjData) => {
                console.log("更新模型", objurl)
                this.showSprite.objData = value;
            })
        }
        private showSprite: left.MaterialModelSprite ;
        public refreshViewValue(): void {
            var temp : materialui.MaterialTree = this.target[this.FunKey];
            this.texturePicUi.url = "icon/base.jpg";

            this.refrishShowMaterialModel(temp)

        
            this.showSprite.material = temp;

            console.log("refreshViewValue",temp)
 
        }
       

    }



}