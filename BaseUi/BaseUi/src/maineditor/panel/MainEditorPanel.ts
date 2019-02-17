module maineditor {

    import Rectangle = Pan3d.Rectangle
    import Vector2D = Pan3d.Vector2D
    import Scene_data = Pan3d.Scene_data

    import UICompenent = Pan3d.UICompenent


    import TextureManager = Pan3d.TextureManager
    import FrameCompenent = Pan3d.FrameCompenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import ColorType = Pan3d.ColorType
    import InteractiveEvent = Pan3d.InteractiveEvent
    import TextAlign = Pan3d.TextAlign

    import ModuleEventManager = Pan3d.ModuleEventManager
    import UIManager = Pan3d.UIManager
    import LabelTextFont = Pan3d.LabelTextFont
    import UIConatiner = Pan3d.UIConatiner;
    import Disp2DBaseText = Pan3d.Disp2DBaseText
    import UIRectangle = Pan3d.UIRectangle
    import UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent
    import baseMeshVo = Pan3d.baseMeshVo
    import ProgrmaManager = Pan3d.ProgrmaManager
    import UIMask = Pan3d.UIMask
    import UiDraw = Pan3d.UiDraw
    import UIData = Pan3d.UIData
    import UIAtlas = Pan3d.UIAtlas
    import Shader3D = Pan3d.Shader3D
    import TextureRes = Pan3d.TextureRes

    import Sprite = layout.Sprite
    import Panel = layout.Panel

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


    export class MainEditorPanel extends UIConatiner {

        public constructor() {
            super();
            this.pageRect = new Rectangle(0, 0, 500, 500)
            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._sceneViewRender = new modelShowRender();
            this.addRender(this._sceneViewRender)


            this._bottomRender.uiAtlas = new UIAtlas();
            this._bottomRender.uiAtlas.setInfo("ui/editor/editor.txt", "ui/editor/editor.png", () => { this.loadConfigCom() });

        }

        private _bottomRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _sceneViewRender: UIRenderOnlyPicComponent;

        protected loadConfigCom(): void {
            this._topRender.uiAtlas = this._bottomRender.uiAtlas
         


            this.a_win_tittle = this.addEvntBut("a_win_tittle", this._topRender)
            this.a_win_tittle.x = 0
            this.a_win_tittle.y = 0

            this.a_win_bg = this.addEvntBut("a_win_bg", this._bottomRender)
            this.a_win_bg.x = 0
            this.a_win_bg.y = 25

            //a_scene_view
            this.initView()

          //  this.setUiListVisibleByItem([this.a_win_tittle], false);

            this.uiLoadComplete = true
            this.refrishSize()

        }
        private a_scene_view: UICompenent
        private initView(): void {
            this._sceneViewRender.uiAtlas = this._topRender.uiAtlas
            this.a_scene_view = this.addChild(this._sceneViewRender.getComponent("a_scene_view"));
            TextureManager.getInstance().getTexture("res/shuangdaonv.jpg", ($texture: TextureRes) => {
                this._sceneViewRender.textureRes = $texture;
 
                Pan3d.TimeUtil.addFrameTick((t: number) => { this.upFrame(t) });


            });
        }
  
        private upFrame(t: number): void {
            MainEditorProcessor.edItorSceneManager.textureRes = this._sceneViewRender.textureRes;
   

            var cam3D: Pan3d.Camera3D = MainEditorProcessor.edItorSceneManager.cam3D
            cam3D.cavanRect.x = this.a_scene_view.x + this.left;
            cam3D.cavanRect.y = this.a_scene_view.y + this.top;
            cam3D.cavanRect.width = this.a_scene_view.width;
            cam3D.cavanRect.height = this.a_scene_view.height;

            MainEditorProcessor.edItorSceneManager.renderToTexture()
           
        }
        private a_win_tittle: UICompenent;
        protected butClik(evt: InteractiveEvent): void {
            if (this.perent) {

            }
        }
        public resize(): void {
            super.resize();
        }
        private pageRect: Rectangle
        public panelEventChanger(value: Rectangle): void {
            if (this.pageRect) {
                this.pageRect.height = value.height;
                this.pageRect.width = value.width;
                this.left = value.x;
                this.top = value.y;
                this.refrishSize();
            }

        }
        public refrishSize(): void {
            if (this.uiLoadComplete) {
                this.a_win_bg.width = this.pageRect.width;
                this.a_win_bg.height = this.pageRect.height-25;
                this.a_win_tittle.width = this.pageRect.width;

                this._bottomRender.applyObjData()
                this._topRender.applyObjData()

                var roundNum: number = 5;
                this.a_scene_view.x = roundNum;
                this.a_scene_view.y = roundNum+25;
                this.a_scene_view.width = this.pageRect.width - roundNum * 2;
                this.a_scene_view.height = this.pageRect.height-25 - roundNum * 2;

            }

            this.resize()
        }

        private a_win_bg: UICompenent;


    }

}

