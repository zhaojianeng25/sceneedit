module prop {

    import Rectangle = Pan3d.Rectangle
    import Shader3D = Pan3d.Shader3D
    import Display3D = Pan3d.Display3D
    import InteractiveEvent = Pan3d.InteractiveEvent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import ProgrmaManager = Pan3d.ProgrmaManager;
    import Scene_data = Pan3d.Scene_data
    import BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite
 

    export class LaterDiplay3dShader extends Shader3D {
        static LaterDiplay3dShader: string = "LaterDiplay3dShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +

                "uniform mat4 viewMatrix3D;" +
                "uniform mat4 camMatrix3D;" +
                "uniform mat4 posMatrix3D;" +

                "varying vec2 v_texCoord;" +

                "void main(void)" +
                "{" +

                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
 
                "   gl_Position = vt0;" +
                "}"
            return $str
 
        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +

                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "gl_FragColor =vec4(1,0,0,1);\n" +

                "gl_FragColor =infoUv*vec4(1,0,0,1);\n" +
                "}"
            return $str

        }

    }

    
   // export class LaterDiplay3dSprite extends BaseDiplay3dSprite {
    export class LaterDiplay3dSprite extends left.MaterialModelSprite {
        public constructor() {
            super()
            this.initData()
        }

        protected initData(): void {
     
            ProgrmaManager.getInstance().registe(LaterDiplay3dShader.LaterDiplay3dShader, new LaterDiplay3dShader);
            this.shader = ProgrmaManager.getInstance().getProgram(LaterDiplay3dShader.LaterDiplay3dShader);
            this.program = this.shader.program;

            this.objData = new ObjData;
            this.objData.vertices = new Array();
            var scale: number=0.5
            this.objData.vertices.push(-1 * scale, -1 * scale, 0);
            this.objData.vertices.push(1 * scale, -1 * scale, 0);
            this.objData.vertices.push(1 * scale, 0 * scale, 0);
            this.objData.vertices.push(-1 * scale, 0 * scale, 0);

            this.objData.uvs = new Array()
            this.objData.uvs.push(0, 1);
            this.objData.uvs.push(1, 1);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(0, 0);

            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.indexs.push(0, 2, 3);


            this.objData.treNum = this.objData.indexs.length
            this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
            this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
            this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
        }
        public outTexture: WebGLTexture;
        public update(): void {
    
            if (this.objData && this.objData.indexBuffer && this.outTexture) {
                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);

                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);

                Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.outTexture, 0);

                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);

            }

       
        }
 

    }

    export class LaterOtherDiplay3dSprite extends left.MaterialModelSprite {


        public update(): void {
            console.log("her------------e");
            super.update();
        }

    }
     
    export class MeshMaterialLfetView2DUI extends MeshSceneView2DUI {


        private iconItem: Array<TexturePicUi>
        protected initView(): void {

            super.initView()

            this.iconItem = []
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
                this.texturePicUi.x = this._x + 0;
                this.texturePicUi.y = this._y + 0


                for (var i: number = 0; i < this.iconItem.length; i++) {
                    this.iconItem[i].x = this._x + 3 + 30 * i;
                    this.iconItem[i].y = this._y + 2;
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
        private latersceneManager: maineditor.EdItorSceneManager;//后期对象
        protected initScene(): void {
            super.initScene()
            this.latersceneManager = new maineditor.EdItorSceneManager();
            this.latersceneManager.ready = true;
            this.latersceneManager.cam3D.cavanRect = new Rectangle(0, 0, 256, 256)
            this.latersceneManager.cam3D.distance = 200;
            this.latersceneManager.focus3D.rotationX = -45;

            this.otherSprite = new LaterDiplay3dSprite()
            this.latersceneManager.addDisplay(this.otherSprite)
   
            this.ktvSprite = new LaterOtherDiplay3dSprite();
            this.latersceneManager.addDisplay(this.ktvSprite);

    
       

        }
        private otherSprite: LaterDiplay3dSprite
        private ktvSprite: LaterOtherDiplay3dSprite
        private setZzwUrlToRole(zzwUrl: string): void {
            if (!this.roleSprite) {
                this.roleSprite = new left.MaterialRoleSprite();
                this.sceneManager.addMovieDisplay(this.roleSprite);
            }
            pack.PackRoleManager.getInstance().getRoleZzwByUrl(zzwUrl, (value: pack.RoleStaticMesh) => {
                this.roleSprite.animDic = value.animDic;
                this.roleSprite.skinMesh = value.skinMesh.clone()
                var temp: materialui.MaterialTree = this.target[this.FunKey];
                for (var i: number = 0; i < this.roleSprite.skinMesh.meshAry.length; i++) {
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
        protected oneByFrame(): void {
            if (this.texturePicUi && this.texturePicUi.textureContext && this.texturePicUi.textureContext.hasStage) {
                Pan3d.MathClass.getCamView(this.sceneManager.cam3D, this.sceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                this.sceneManager.renderToTexture();


                this.otherSprite.outTexture = this.sceneManager.fbo.texture;


                Pan3d.MathClass.getCamView(this.latersceneManager.cam3D, this.latersceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                this.latersceneManager.renderToTexture();




                var $uiRender: UIRenderComponent = this.texturePicUi.textureContext.ui.uiRender;
                $uiRender.uiAtlas.textureRes.texture = this.latersceneManager.fbo.texture

                var maxNum: number = Math.min(this.texturePicUi.textureContext.ui.width, this.texturePicUi.textureContext.ui.height)
                this.sceneManager.cam3D.cavanRect = new Rectangle(0, 0, maxNum, maxNum)

            }
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
                if (!this.modelSprite.objData || this.lastObjUrl == objurl) {
                    this.modelSprite.objData = value;
                }
                this.modelSprite.sceneVisible = true
                if (this.roleSprite) {
                    this.roleSprite.sceneVisible = false
                }


            })
        }
        private modelSprite: left.MaterialModelSprite;
        private roleSprite: left.MaterialRoleSprite;

        public refreshViewValue(): void {
            var temp: materialui.MaterialTree = this.target[this.FunKey];
            this.texturePicUi.url = "icon/base.jpg";
            this.setObjUrlToSprite(this.defFileUrl) //选给默认对象
 
            this.modelSprite.material = temp;
            this.refrishShowMaterialModel(temp)
 

            pack.PackObjDataManager.getInstance().getObjDataByUrl("assets/objs/ball.objs", (value: ObjData) => {
                this.ktvSprite.objData = value;
            })

         // var cloneMaterialTree: materialui.MaterialTree = new materialui.MaterialTree()
            var cloneMaterialTree: materialui.MaterialTree = temp.clone()
  
            var $buildShader: left.BuildMaterialShader = new left.BuildMaterialShader();
            $buildShader.paramAry = temp.modelShader.paramAry
           // $buildShader.vertex = temp.modelShader.getVertexShaderString();

            var agalStr: string = "attribute vec3 v3Position;\n" +
                "attribute vec2 v2CubeTexST;\n" +
                "varying vec2 v0;\n" +
                "uniform mat4 vpMatrix3D;\n" +
                "uniform mat4 posMatrix3D;\n" +
                "uniform mat3 rotationMatrix3D;\n" +
                "varying highp vec3 vPos;\n" +
                "void main(void){\n" +
                "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y);\n" +
                "vec4 vt0 = vec4(v3Position, 1.0);\n" +
                "vt0 = posMatrix3D * vt0;\n" +
                "vt0 = vpMatrix3D * vt0;\n" +
                "gl_Position = vt0;\n" +
                "vPos = v3Position;\n" +
                "} "

            $buildShader.vertex = agalStr

            $buildShader.fragment = temp.modelShader.fragment
            $buildShader.encode();
            cloneMaterialTree.modelShader = $buildShader

 
            this.ktvSprite.material = cloneMaterialTree
      
        }


    }



}