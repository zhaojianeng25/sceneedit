module popmodel {
    import UICompenent = Pan3d.UICompenent
    import FrameCompenent = Pan3d.FrameCompenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import ColorType = Pan3d.ColorType
    import InteractiveEvent = Pan3d.InteractiveEvent
    import TextAlign = Pan3d.TextAlign
    import Rectangle = Pan3d.Rectangle
    import ModuleEventManager = Pan3d.ModuleEventManager
    import UIManager = Pan3d.UIManager
    import LabelTextFont = Pan3d.LabelTextFont
    import UIConatiner = Pan3d.UIConatiner;
    import Disp2DBaseText = Pan3d.Disp2DBaseText
    import UIRectangle = Pan3d.UIRectangle
    import baseMeshVo = Pan3d.baseMeshVo
    import MouseType = Pan3d.MouseType
    import ByteArray = Pan3d.Pan3dByteArray
    import UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent;

    import ModelShowModel = left.ModelShowModel

    import UIMask = Pan3d.UIMask
    import UiDraw = Pan3d.UiDraw
    import UIData = Pan3d.UIData
    import UIAtlas = Pan3d.UIAtlas
    import ObjData = Pan3d.ObjData
    import Shader3D = Pan3d.Shader3D
    import ProgrmaManager = Pan3d.ProgrmaManager
    import Scene_data = Pan3d.Scene_data
    import Vector2D = Pan3d.Vector2D

    export class BloomUiShader extends Shader3D {
        static BloomUiShader: string = "BloomUiShader";
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
                "attribute vec3 v2uv;" +

                "uniform vec4 ui[50];" +
                "uniform vec4 ui2[50];" +

                "varying vec2 v_texCoord;" +

                "void main(void)" +
                "{" +
                "   vec4 data = ui2[int(v2uv.z)];" +
                "   v_texCoord = vec2(v2uv.x * data.x + data.z, v2uv.y * data.y + data.w);" +
                "   data = ui[int(v2uv.z)];" +
                "   vec3 pos = vec3(0.0,0.0,0.0);" +
                "   pos.xy = v3Pos.xy * data.zw * 2.0;" +
                "   pos.x += data.x * 2.0 - 1.0;" +
                "   pos.y += -data.y * 2.0 + 1.0;" +
                "   vec4 vt0= vec4(pos, 1.0);" +
                "   gl_Position = vt0;" +
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                " precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +
                "uniform vec3 uScale;\n" +
                "uniform vec3 uBias;\n" +
                "vec3 ii(vec3 c){vec3 ij=sqrt(c);\n" +
                "return(ij-ij*c)+c*(0.4672*c+vec3(0.5328));\n" +
                "}void main(void){\n" +

                "vec4 ik=texture2D(s_texture,v_texCoord);\n" +
                "vec3 c=ik.xyz;\n" +
                "c=c*uScale+uBias;\n" +

                "gl_FragColor.xyz=ii(c);\n" +
                "gl_FragColor=vec4(ik.x,ik.y,ik.z,1.0);\n" +


                "}"
            return $str

        }

    }

    export class modelShowRender extends UIRenderOnlyPicComponent {
        public constructor() {
            super();

        }
        protected uiProLocation: WebGLUniformLocation;
        protected ui2ProLocation: WebGLUniformLocation;
        protected initData(): void {
            this._uiList = new Array;

            this.objData = new ObjData();
            ProgrmaManager.getInstance().registe(BloomUiShader.BloomUiShader, new BloomUiShader)
            this.shader = ProgrmaManager.getInstance().getProgram(BloomUiShader.BloomUiShader);
            this.program = this.shader.program;

            this.uiProLocation = Scene_data.context3D.getLocation(this.program, "ui")
            this.ui2ProLocation = Scene_data.context3D.getLocation(this.program, "ui2")



        }
        public makeRenderDataVc($vcId: number): void {
            super.makeRenderDataVc($vcId);
            for (var i: number = 0; i < this.renderData2.length / 4; i++) {
                this.renderData2[i * 4 + 0] = 1;
                this.renderData2[i * 4 + 1] = -1;
                this.renderData2[i * 4 + 2] = 0;
                this.renderData2[i * 4 + 3] = 0;
            }
        }

        public update(): void {


            if (!this.visible || this._uiList.length == 0) {
                if (this.modelRenderList && this.modelRenderList.length) {

                } else {
                    return
                }

            }
            Scene_data.context3D.setBlendParticleFactors(this.blenderMode);
            Scene_data.context3D.setProgram(this.program);
            this.setVc()
            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);
            this.setTextureToGpu()

            Scene_data.context3D.setVc3fv(this.shader, "uScale", [3.51284, 3.51284, 3.51284]);
            Scene_data.context3D.setVc3fv(this.shader, "uScale", [1, 1, 1]);
            Scene_data.context3D.setVc3fv(this.shader, "uBias", [0, 0, 0]);

            Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            if (this.modelRenderList) {
                for (var i: number = 0; i < this.modelRenderList.length; i++) {
                    this.modelRenderList[i].update();
                }
            }
        }
    }


    export class PopModelShowPanel extends UIConatiner {

        public static imgBaseDic: any
        public constructor() {
            super();
            this.left = 400;
            this.top = 300;
            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this.modelPic = new modelShowRender();
            this.addRender(this.modelPic)

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

   

            this._bottomRender.uiAtlas = new UIAtlas();
            this._bottomRender.uiAtlas.setInfo("ui/materialmodeshow/materialmodeshow.txt", "ui/materialmodeshow/materialmodeshow.png", () => { this.loadConfigCom() });

        }

        private _bottomRender: UIRenderComponent;
   
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
   

        protected mouseDown(evt: InteractiveEvent): void {
            this.mouseIsDown = true
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        }
        private mouseIsDown: boolean
        protected stageMouseMove(evt: InteractiveEvent): void {
            this.mouseIsDown = false

        }
        protected mouseUp(evt: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.stageMouseMove, this);


        }
        private modelPic: modelShowRender;
        protected loadConfigCom(): void {
            this._midRender.uiAtlas = this._bottomRender.uiAtlas
            this._topRender.uiAtlas = this._bottomRender.uiAtlas
            this.pageRect = new Rectangle(0, 0, 300, 300)
 
 

            this.a_bg = this.addEvntBut("a_bg", this._bottomRender);
            this.a_win_tittle = this.addChild(<UICompenent>this._midRender.getComponent("a_win_tittle"));
            this.a_win_tittle.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);

            this.a_rigth_line = this.addChild(<UICompenent>this._midRender.getComponent("a_rigth_line"));
            this.a_rigth_line.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);

            this.a_bottom_line = this.addChild(<UICompenent>this._midRender.getComponent("a_bottom_line"));
            this.a_bottom_line.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);

            this.a_right_bottom = this.addChild(<UICompenent>this._midRender.getComponent("a_right_bottom"));
            this.a_right_bottom.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);

            this.a_win_label_left = this.addEvntBut("a_win_label_left", this._topRender);
            this.a_win_label_centen = this.addEvntBut("a_win_label_centen", this._topRender);
            this.a_win_label_right = this.addEvntBut("a_win_label_right", this._topRender);


            this.a_but_a = this.addEvntBut("a_but_a", this._topRender);
            this.a_but_b = this.addEvntBut("a_but_b", this._topRender);
            this.a_but_c = this.addEvntBut("a_but_c", this._topRender);

 

            this.initView();
            this.refrishSize()


            document.addEventListener(MouseType.MouseWheel, ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) });


        }
        private a_but_a: UICompenent
        private a_but_b: UICompenent
        private a_but_c: UICompenent

        private a_win_label_left: UICompenent
        private a_win_label_centen: UICompenent
        private a_win_label_right: UICompenent

        public onMouseWheel($evt: MouseWheelEvent): void {
            var $slectUi: UICompenent = UIManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y))
            if ($slectUi && $slectUi.parent == this) {
                Scene_data.cam3D.distance += ($evt.wheelDelta * Scene_data.cam3D.distance) / 1000;
                
            }
        }
        private showModelPicUI: UICompenent
        private initView(): void {
            this.modelPic.uiAtlas = this._midRender.uiAtlas
            this.showModelPicUI = this.addChild(this.modelPic.getComponent("a_bg"));
 

            this.modelPic.setImgUrl("pan/marmoset/uilist/1024.jpg");
            ModelShowModel.getInstance()._bigPic = this.modelPic;
 
            ModelShowModel.getInstance().addBaseModel()
 
            this.showModelPicUI.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
 


        }
        private a_bottom_line: UICompenent



        private a_right_bottom: UICompenent;
        private a_rigth_line: UICompenent;
        private refrishSize(): void {

            this.pageRect.width = Math.max(300, this.pageRect.width)
            this.pageRect.height = Math.max(300, this.pageRect.height)

            this.a_win_tittle.x = 0;
            this.a_win_tittle.y = 0;
            this.a_win_tittle.width = this.pageRect.width;


            
            this.a_bg.x = 0;
            this.a_bg.y = 0
            this.a_bg.width = this.pageRect.width
            this.a_bg.height = this.pageRect.height

            this.a_rigth_line.x = this.pageRect.width - this.a_rigth_line.width
            this.a_rigth_line.y = this.a_win_tittle.height;
            this.a_rigth_line.height = this.pageRect.height - this.a_win_tittle.height - this.a_right_bottom.height;

            this.a_bottom_line.x = 0
            this.a_bottom_line.y = this.pageRect.height - this.a_bottom_line.height
            this.a_bottom_line.width = this.pageRect.width - this.a_right_bottom.width;


            this.a_right_bottom.x = this.pageRect.width - this.a_right_bottom.width
            this.a_right_bottom.y = this.pageRect.height - this.a_right_bottom.height
 
            this.resize();


            var minW: number = Math.min(this.pageRect.width, this.pageRect.height - this.a_win_tittle.height)
            this.showModelPicUI.width = minW;
            this.showModelPicUI.height = minW;

            this.showModelPicUI.x = (this.pageRect.width - minW) / 2
            this.showModelPicUI.y = (this.pageRect.height - this.a_win_tittle.height - minW) / 2 + this.a_win_tittle.height


            this.a_win_label_left.y = this.pageRect.height - this.a_win_label_left.height
            this.a_win_label_left.y = this.a_win_tittle.height-5
            this.a_win_label_centen.y = this.a_win_label_left.y
            this.a_win_label_right.y = this.a_win_label_centen.y

            this.a_win_label_left.x = 0
            this.a_win_label_centen.x = this.a_win_label_left.x + this.a_win_label_left.width

            this.a_win_label_right.x = this.pageRect.width - this.a_win_label_right.width
            this.a_win_label_centen.width = this.pageRect.width - this.a_win_label_left.width - this.a_win_label_right.width

            this.a_but_a.y = this.pageRect.height - 40
            this.a_but_b.y = this.pageRect.height - 40
            this.a_but_c.y = this.pageRect.height - 40

        

        }
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_but_a:
                    console.log(evt.target)
                    this.selectInputDae(evt)
                    break
                case this.a_but_b:
                    break
                case this.a_but_c:
                    break
                default:
                    break
            }
        }
        private _inputHtmlSprite: HTMLInputElement
        protected selectInputDae(evt: InteractiveEvent): void {


            this._inputHtmlSprite = <HTMLInputElement>document.createElement('input');
            this._inputHtmlSprite.setAttribute('id', '_ef');
            this._inputHtmlSprite.setAttribute('type', 'file');
            this._inputHtmlSprite.setAttribute("style", 'visibility:hidden');
            this._inputHtmlSprite.click();
            this._inputHtmlSprite.value;
            this._inputHtmlSprite.addEventListener("change", (cevt: any) => { this.changeFile(cevt) });


        }
        private changeFile(evt: any): void {
            for (var i: number = 0; i < this._inputHtmlSprite.files.length && i < 1; i++) {
                var simpleFile: File = <File>this._inputHtmlSprite.files[i];
                if (!/image\/\w+/.test(simpleFile.type)) {
                    var $reader: FileReader = new FileReader();

                    if (simpleFile.name.indexOf(".md5mesh") != -1) {

                        $reader.readAsText(simpleFile);
                        $reader.onload = ($temp: Event) => {
                            ModelShowModel.getInstance().webmd5Sprite.addLocalMeshByStr(<string>$reader.result)
                        }
                        return
                    }
                    if (simpleFile.name.indexOf(".md5anim") != -1) {

                        $reader.readAsText(simpleFile);
                        $reader.onload = ($temp: Event) => {
                            ModelShowModel.getInstance().webmd5Sprite.addLocalAdimByStr(<string>$reader.result)

                            ModelShowModel.getInstance().changeWebModel();
                        }
                        return
                    }
                    if (simpleFile.name.indexOf("objs.txt") != -1) {
                        $reader.readAsText(simpleFile);
                        $reader.onload = ($temp: Event) => {
                            ModelShowModel.getInstance().readTxtToModelBy(<string>$reader.result)
                        }
                    } else {
                        // alert("objs.txt结尾对象0" + simpleFile.name);
                        $reader.readAsArrayBuffer(simpleFile);
                        $reader.onload = ($temp: Event) => {
                            if (this.isRoleFile(<ArrayBuffer>$reader.result)) {
                                console.log("是角色", simpleFile.name)
                                filemodel.RoleChangeModel.getInstance().loadLocalFile(<ArrayBuffer>$reader.result)
                                left.SceneRenderToTextrue.getInstance().viweLHnumber = 1000
                            } else {
                                alert("不确定类型");
                            }
                        }

                    }
                } else {
                    alert("请确保文件类型为图像类型");
                }
            }
            this._inputHtmlSprite = null;
        }
        private isRoleFile(arrayBuffer: ArrayBuffer): boolean {
            var $byte: ByteArray = new ByteArray(arrayBuffer);
            $byte.position = 0
            var $version: number = $byte.readInt();
            var $url: string = $byte.readUTF();
            if ($url.indexOf("role/") != -1) {
                return true
            } else {
                return false
            }

        }

        private lastPagePos: Vector2D;
        private lastMousePos: Vector2D;
        private mouseMoveTaget: UICompenent
        private pageRect: Rectangle
        protected tittleMouseDown(evt: InteractiveEvent): void {
            this.mouseMoveTaget = evt.target

            this.lastMousePos = new Vector2D(evt.x, evt.y)

            switch (this.mouseMoveTaget) {
                case this.a_win_tittle:
                    this.lastPagePos = new Vector2D(this.left, this.top)
                    break
                case this.showModelPicUI:
                    this.lastPagePos = new Vector2D(Scene_data.focus3D.rotationX, Scene_data.focus3D.rotationY)
                    console.log("PopModelShowPanel")
                    break

                    
                case this.a_rigth_line:
                case this.a_bottom_line:
                case this.a_right_bottom:
                    this.lastPagePos = new Vector2D(this.pageRect.width, this.pageRect.height)
                    break
        

                default:
                    console.log("nonono")
                    break

            }




            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        }
        protected tittleMouseUp(evt: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        }
        protected mouseOnTittleMove(evt: InteractiveEvent): void {
            switch (this.mouseMoveTaget) {
                case this.a_win_tittle:
                    this.left = this.lastPagePos.x + (evt.x - this.lastMousePos.x)
                    this.top = this.lastPagePos.y + (evt.y - this.lastMousePos.y)
                    this.pageRect.x = this.left;
                    this.pageRect.y = this.top;
                    break
                case this.a_rigth_line:
                    this.pageRect.width = this.lastPagePos.x + (evt.x - this.lastMousePos.x)

                    break
                case this.a_bottom_line:
                    this.pageRect.height = this.lastPagePos.y + (evt.y - this.lastMousePos.y)

                    break

                case this.a_right_bottom:
                    this.pageRect.width = this.lastPagePos.x + (evt.x - this.lastMousePos.x)
                    this.pageRect.height = this.lastPagePos.y + (evt.y - this.lastMousePos.y)
                    break

                case this.showModelPicUI:
               
                    Scene_data.focus3D.rotationX = this.lastPagePos.x - (evt.y - this.lastMousePos.y)
                    Scene_data.focus3D.rotationY = this.lastPagePos.y - (evt.x - this.lastMousePos.x)
          
                    break
           
                default:
                    console.log("nonono")
                    break

            }
            this.refrishSize()

        }
        private a_bg: UICompenent;
        private a_win_tittle: UICompenent;




    }
}