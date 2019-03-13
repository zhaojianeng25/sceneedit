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
    import MouseType = Pan3d.MouseType
    import MathUtil = Pan3d.MathUtil

    import PanDragEvent = drag.PanDragEvent

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


    export class MainEditorPanel extends base.BaseWindow {

        public constructor() {
            super();
            this.pageRect = new Rectangle(0, 0, 500, 500)
          

            this._sceneViewRender = new modelShowRender();
            this.addRender(this._sceneViewRender)


       
        
      
        }
 

 
        private _sceneViewRender: UIRenderOnlyPicComponent;

        protected loadConfigCom(): void {
            super.loadConfigCom();
 
            this.initView()

 


            var item: Array<UICompenent> = [
                this.b_bottom_left,
                this.b_bottom_mid,
                this.b_bottom_right,
                this.b_bottom_line_left,
                this.b_bottom_line_right,
                this.a_bottom_line,
                this.a_scroll_bar_bg,
 
  
 
            ]
            this.setUiListVisibleByItem(item, false)

            this.uiLoadComplete = true
            this.refrishSize()

        }
        private a_scene_view: UICompenent
        private initView(): void {
            this._sceneViewRender.uiAtlas = this._tRender.uiAtlas
            this.a_scene_view = this.addChild(this._sceneViewRender.getComponent("a_scene_view"));
            TextureManager.getInstance().getTexture("res/shuangdaonv.jpg", ($texture: TextureRes) => {
                this._sceneViewRender.textureRes = $texture;
                Pan3d.TimeUtil.addFrameTick((t: number) => { this.upFrame(t) });
            });

            this.a_scene_view.addEventListener(PanDragEvent.DRAG_DROP, this.dragDrop, this);
            this.a_scene_view.addEventListener(PanDragEvent.DRAG_ENTER, this.dragEnter, this);
            this.a_scene_view.addEventListener(InteractiveEvent.Down, this.butClik, this);
 
            document.addEventListener(MouseType.MouseWheel, ($evt: MouseWheelEvent) => { this.onPanellMouseWheel($evt) });
        }
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_scene_view:
                    if (evt.mouseEvent.ctrlKey || evt.mouseEvent.shiftKey) {

                        ModuleEventManager.dispatchEvent(new MainEditorEvent(MainEditorEvent.SCENE_SELECT_SPRITE_DOWN), evt)
                    }
                    break
                default:
                    break
            }

        }
        public onPanellMouseWheel($evt: MouseWheelEvent): void {
            var $slectUi: UICompenent = layout.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y))
            if ($slectUi && $slectUi.parent == this) {

                var q: Pan3d.Quaternion = new Pan3d.Quaternion();
                q.fromMatrix(MainEditorProcessor.edItorSceneManager.cam3D.cameraMatrix);
                var m: Pan3d.Matrix3D = q.toMatrix3D()
                m.invert()
                var $add: Vector3D = m.transformVector(new Vector3D(0, 0, $evt.wheelDelta / 100 ))
                MainEditorProcessor.edItorSceneManager.cam3D.x += $add.x
                MainEditorProcessor.edItorSceneManager.cam3D.y += $add.y
                MainEditorProcessor.edItorSceneManager.cam3D.z += $add.z

                MathUtil.MathCam(MainEditorProcessor.edItorSceneManager.cam3D)
 
            }
        }
        private dragDrop(evt: PanDragEvent): void {
            if (this.testSuffix(drag.DragManager.dragSource.url)) {
                console.log("可以拖动")
            } else {
                console.log("不可以")
            }

        }
        public suffix: string="prefab"
        private testSuffix(value: string): boolean {
            if (!this.suffix) {
                return;
            }
            var tempItem: Array<string> = this.suffix.split("|")
            for (var i: number = 0; i < tempItem.length; i++) {
                if (value.indexOf(tempItem[i]) != -1) {
                    return true
                }
            }
            return false
        }
        private dragEnter(evt: PanDragEvent): void {
            if (this.testSuffix(drag.DragManager.dragSource.url)) {
                var obj: any = {}
                obj.url = drag.DragManager.dragSource.url
                obj.mouse = new Vector2D(evt.data.x, evt.data.y);
 
                ModuleEventManager.dispatchEvent(new MainEditorEvent(MainEditorEvent.INPUT_PREFAB_TO_SCENE), obj)
            }
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
       
     
        public resize(): void {
            super.resize();
        }
     
        public panelEventChanger(value: Rectangle): void {
          

            this.setRect(value)
            this.refrishSize()

        }
        public refrishSize(): void {
            if (this.uiLoadComplete) {
                var roundNum: number = 0;
                this.a_scene_view.x = roundNum;
                this.a_scene_view.y = roundNum+15;
                this.a_scene_view.width = this.pageRect.width - roundNum * 2;
                this.a_scene_view.height = this.pageRect.height - roundNum * 2;

            }

            this.resize()
        }

  


    }

}

