module prop {
     

    import InteractiveEvent = Pan3d.InteractiveEvent

    export class MeshMaterialLfetView2DUI extends MeshSceneView2DUI {


        private iconItem: Array<TexturePicUi>
        protected initView(): void {

            super.initView()

            this.iconItem=[]
            for (var i: number = 0; i < 5; i++) {
                var tempUi: TexturePicUi = new TexturePicUi(24, 24);
                this.propPanle.addBaseMeshUi(tempUi)
                this.drawUrlImgToUi(tempUi.ui, "icon/modelicon/" + (i + 1) + ".png");
                tempUi.ui.addEventListener(InteractiveEvent.Down, this.butClik, this);
                this.iconItem.push(tempUi)
            }
     
       
        }
        protected butClik(evt: InteractiveEvent): void {
  
            super.butClik(evt);

            for (var i: number = 0; i < this.iconItem.length; i++) {
                if (this.iconItem[i].ui == evt.target) {

                    switch (i) {
                        case 0:
                            this.setObjUrlToSprite("assets/objs/box.objs")
                            break
                        case 1:
                            this.setObjUrlToSprite("assets/objs/cylinder.objs")
                            break
                        case 2:
                            this.setObjUrlToSprite("assets/objs/plant.objs")
                            break
                        case 3:
                            this.setObjUrlToSprite("assets/objs/ball.objs")
                            break
                        case 4:
                            this.setObjUrlToSprite("assets/objs/tuzhi.objs")
                            break
                        default:
                            break
                    }

                }
       
            }

        }
  
 
        public set x(value: number) {
            this._x = value;
            this.textLabelUI.x = this._x + 100000;
            this.texturePicUi.x = this._x + 10;
            this.textureUrlText.x = this._x + 10000;

    
            this.resize()
        }
        public resize(): void {

            if (this._width && this.texturePicUi) {
                //this._x = (this._width - 200) / 2;
                //this.texturePicUi.x = this._x;
                //this.texturePicUi.y = this._y + 5
                this._height = this._width

                var showSize: number = this._width - 2;

                this.texturePicUi.ui.width = showSize
                this.texturePicUi.ui.height = showSize

                this._x = (this._width - showSize) / 2;
                this.texturePicUi.x = this._x+0;
                this.texturePicUi.y = this._y + 0


                for (var i: number = 0; i < this.iconItem.length; i++) {
                    this.iconItem[i].x = this._x+3 + 30 * i;
                    this.iconItem[i].y = this._y+2;
                }
            }
            this.destory
   
        }
        public destory(): void {
            while (this.iconItem.length) {
                var tempUi: TexturePicUi = this.iconItem.pop()
                tempUi.destory();
            }
            super.destory()
       
        }
        protected texturePicUiChange($evt: ReflectionEvet): void {



            var temp: materialui.MaterialTree = this.target[this.FunKey];
            temp.showurl = this.texturePicUi.url

            this.refrishShowMaterialModel(temp)
 



            



        }
        private defFileUrl: string = "assets/objs/ball.objs"
        private refrishShowMaterialModel(material: materialui.MaterialTree): void {
            var fileUrl: string = material.showurl;
            if (!fileUrl) {
                fileUrl = this.defFileUrl;
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
                    this.setZzwUrlToRole(fileUrl)
                    break
            }
        }
        private setZzwUrlToRole(zzwUrl:string): void {
            if (!this.roleSprite) {
                this.roleSprite = new left.MaterialRoleSprite();
                this.sceneManager.addMovieDisplay(this.roleSprite);
            }
            pack.PackRoleManager.getInstance().getRoleZzwByUrl(zzwUrl, (value: pack.RoleStaticMesh) => {
                this.roleSprite.animDic = value.animDic;
                this.roleSprite.skinMesh = value.skinMesh.clone()
                var temp: materialui.MaterialTree = this.target[this.FunKey];
                for (var i: number = 0; i < this.roleSprite.skinMesh.meshAry.length;i++) {
                    this.roleSprite.skinMesh.meshAry[i].material = temp
                    this.roleSprite.skinMesh.meshAry[i].materialParam = null
                }
                this.roleSprite.curentAction = "walk";
                this.roleSprite.sceneVisible = true
                if (this.modelSprite) {
                    this.modelSprite.sceneVisible = false
                }

            })
          
        }
    
        public set width(value: number) {
            this._width = value;
            this.resize()
        }

        public constructor(value: UiMeshSprite) {
            super(value);
      
        }
        private lastObjUrl: string
        private setObjUrlToSprite(objurl: string): void {

            if (!this.modelSprite) {
                this.modelSprite = new left.MaterialModelSprite();
                this.sceneManager.addDisplay(this.modelSprite);
            }

            this.lastObjUrl = objurl
            pack.PackObjDataManager.getInstance().getObjDataByUrl(objurl, (value: ObjData) => {
                console.log("更新模型", objurl)
                if (!this.modelSprite.objData || this.lastObjUrl== objurl) {
                    this.modelSprite.objData = value;
                }
                this.modelSprite.sceneVisible = true
                if (this.roleSprite) {
                    this.roleSprite.sceneVisible = false
                }

             
            })
        }
        private modelSprite: left.MaterialModelSprite;
        private roleSprite: left.MaterialRoleSprite
        public refreshViewValue(): void {
            var temp : materialui.MaterialTree = this.target[this.FunKey];
            this.texturePicUi.url = "icon/base.jpg";
            this.setObjUrlToSprite(this.defFileUrl) //选给默认对象
            this.modelSprite.material = temp;
            this.refrishShowMaterialModel(temp)
        
 
 
        }
       

    }



}