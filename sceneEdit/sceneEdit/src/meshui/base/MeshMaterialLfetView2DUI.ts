﻿module prop {

    import Rectangle = Pan3d.Rectangle
    import Shader3D = Pan3d.Shader3D
    import Camera3D = Pan3d.Camera3D
    import InteractiveEvent = Pan3d.InteractiveEvent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import GridLineSprite = Pan3d.GridLineSprite;
    import BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite;

    export class Later2DShader extends Shader3D {
        static Later2DShader: string = "Later2DShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Pos;" +
                "attribute vec2 v2uv;" +
                "varying vec2 v_texCoord;" +

                "void main(void)" +
                "{" +
                "v_texCoord = vec2(v2uv.x,v2uv.y);" +
                "gl_Position =vec4(v3Pos.x,v3Pos.y,v3Pos.z,1.0);" +
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                " precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +

                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "gl_FragColor = infoUv;\n" +

                "}"
            return $str

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
        private latersceneManager: maineditor. LaterSceneManager;//后期对象
        protected initScene(): void {
            super.initScene()
            this.latersceneManager = new maineditor.LaterSceneManager();


        }
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

                this.latersceneManager.renderToTexture();



                var $uiRender: UIRenderComponent = this.texturePicUi.textureContext.ui.uiRender;
                $uiRender.uiAtlas.textureRes.texture = this.sceneManager.fbo.texture

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



        }


    }



}