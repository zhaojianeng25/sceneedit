var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var maineditor;
(function (maineditor) {
    var Rectangle = Pan3d.Rectangle;
    var Vector2D = Pan3d.Vector2D;
    var Scene_data = Pan3d.Scene_data;
    var TextureManager = Pan3d.TextureManager;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var Shader3D = Pan3d.Shader3D;
    var MouseType = Pan3d.MouseType;
    var MathUtil = Pan3d.MathUtil;
    var PanDragEvent = drag.PanDragEvent;
    var BloomUiShader = /** @class */ (function (_super) {
        __extends(BloomUiShader, _super);
        function BloomUiShader() {
            return _super.call(this) || this;
        }
        BloomUiShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
        };
        BloomUiShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Pos;" +
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
                "}";
            return $str;
        };
        BloomUiShader.prototype.getFragmentShaderString = function () {
            var $str = " precision mediump float;\n" +
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
                "}";
            return $str;
        };
        BloomUiShader.BloomUiShader = "BloomUiShader";
        return BloomUiShader;
    }(Shader3D));
    maineditor.BloomUiShader = BloomUiShader;
    var modelShowRender = /** @class */ (function (_super) {
        __extends(modelShowRender, _super);
        function modelShowRender() {
            return _super.call(this) || this;
        }
        modelShowRender.prototype.initData = function () {
            this._uiList = new Array;
            this.objData = new ObjData();
            ProgrmaManager.getInstance().registe(BloomUiShader.BloomUiShader, new BloomUiShader);
            this.shader = ProgrmaManager.getInstance().getProgram(BloomUiShader.BloomUiShader);
            this.program = this.shader.program;
            this.uiProLocation = Scene_data.context3D.getLocation(this.program, "ui");
            this.ui2ProLocation = Scene_data.context3D.getLocation(this.program, "ui2");
        };
        modelShowRender.prototype.makeRenderDataVc = function ($vcId) {
            _super.prototype.makeRenderDataVc.call(this, $vcId);
            for (var i = 0; i < this.renderData2.length / 4; i++) {
                this.renderData2[i * 4 + 0] = 1;
                this.renderData2[i * 4 + 1] = -1;
                this.renderData2[i * 4 + 2] = 0;
                this.renderData2[i * 4 + 3] = 0;
            }
        };
        modelShowRender.prototype.update = function () {
            if (!this.visible || this._uiList.length == 0) {
                if (this.modelRenderList && this.modelRenderList.length) {
                }
                else {
                    return;
                }
            }
            Scene_data.context3D.setBlendParticleFactors(this.blenderMode);
            Scene_data.context3D.setProgram(this.program);
            this.setVc();
            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);
            this.setTextureToGpu();
            Scene_data.context3D.setVc3fv(this.shader, "uScale", [3.51284, 3.51284, 3.51284]);
            Scene_data.context3D.setVc3fv(this.shader, "uScale", [1, 1, 1]);
            Scene_data.context3D.setVc3fv(this.shader, "uBias", [0, 0, 0]);
            Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            if (this.modelRenderList) {
                for (var i = 0; i < this.modelRenderList.length; i++) {
                    this.modelRenderList[i].update();
                }
            }
        };
        return modelShowRender;
    }(UIRenderOnlyPicComponent));
    maineditor.modelShowRender = modelShowRender;
    var MainEditorPanel = /** @class */ (function (_super) {
        __extends(MainEditorPanel, _super);
        function MainEditorPanel() {
            var _this = _super.call(this) || this;
            _this.suffix = "prefab";
            _this.pageRect = new Rectangle(0, 0, 500, 500);
            _this._sceneViewRender = new modelShowRender();
            _this.addRender(_this._sceneViewRender);
            return _this;
        }
        MainEditorPanel.prototype.loadConfigCom = function () {
            _super.prototype.loadConfigCom.call(this);
            this.initView();
            this.uiLoadComplete = true;
            this.refrishSize();
        };
        MainEditorPanel.prototype.initView = function () {
            var _this = this;
            this._sceneViewRender.uiAtlas = this._tRender.uiAtlas;
            this.a_scene_view = this.addChild(this._sceneViewRender.getComponent("a_scene_view"));
            TextureManager.getInstance().getTexture("res/shuangdaonv.jpg", function ($texture) {
                _this._sceneViewRender.textureRes = $texture;
                Pan3d.TimeUtil.addFrameTick(function (t) { _this.upFrame(t); });
            });
            this.a_scene_view.addEventListener(PanDragEvent.DRAG_DROP, this.dragDrop, this);
            this.a_scene_view.addEventListener(PanDragEvent.DRAG_ENTER, this.dragEnter, this);
            this.a_scene_view.addEventListener(InteractiveEvent.Down, this.butClik, this);
            document.addEventListener(MouseType.MouseWheel, function ($evt) { _this.onPanellMouseWheel($evt); });
        };
        MainEditorPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_scene_view:
                    if (evt.mouseEvent.ctrlKey || evt.mouseEvent.shiftKey) {
                        ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SCENE_SELECT_SPRITE_DOWN), evt);
                    }
                    break;
                default:
                    break;
            }
        };
        MainEditorPanel.prototype.onPanellMouseWheel = function ($evt) {
            var $slectUi = win.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y));
            if ($slectUi && $slectUi.parent == this) {
                var q = new Pan3d.Quaternion();
                q.fromMatrix(maineditor.MainEditorProcessor.edItorSceneManager.cam3D.cameraMatrix);
                var m = q.toMatrix3D();
                m.invert();
                var $add = m.transformVector(new Vector3D(0, 0, $evt.wheelDelta / 100));
                maineditor.MainEditorProcessor.edItorSceneManager.cam3D.x += $add.x;
                maineditor.MainEditorProcessor.edItorSceneManager.cam3D.y += $add.y;
                maineditor.MainEditorProcessor.edItorSceneManager.cam3D.z += $add.z;
                MathUtil.MathCam(maineditor.MainEditorProcessor.edItorSceneManager.cam3D);
            }
        };
        MainEditorPanel.prototype.dragDrop = function (evt) {
            if (this.testSuffix(drag.DragManager.dragSource.url)) {
                console.log("可以拖动");
            }
            else {
                console.log("不可以");
            }
        };
        MainEditorPanel.prototype.testSuffix = function (value) {
            if (!this.suffix) {
                return;
            }
            var tempItem = this.suffix.split("|");
            for (var i = 0; i < tempItem.length; i++) {
                if (value.indexOf(tempItem[i]) != -1) {
                    return true;
                }
            }
            return false;
        };
        MainEditorPanel.prototype.dragEnter = function (evt) {
            if (this.testSuffix(drag.DragManager.dragSource.url)) {
                var obj = {};
                obj.url = drag.DragManager.dragSource.url;
                obj.name = "新对象";
                obj.pos = maineditor.MainEditorProcessor.edItorSceneManager.getGroundPos(new Vector2D(evt.data.x, evt.data.y));
                ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.INPUT_PREFAB_TO_SCENE), obj);
            }
        };
        MainEditorPanel.prototype.upFrame = function (t) {
            if (this.hasStage) {
                maineditor.MainEditorProcessor.edItorSceneManager.textureRes = this._sceneViewRender.textureRes;
                var cam3D = maineditor.MainEditorProcessor.edItorSceneManager.cam3D;
                cam3D.cavanRect.x = this.a_scene_view.x + this.left;
                cam3D.cavanRect.y = this.a_scene_view.y + this.top;
                cam3D.cavanRect.width = this.a_scene_view.width;
                cam3D.cavanRect.height = this.a_scene_view.height;
                maineditor.MainEditorProcessor.edItorSceneManager.renderToTexture();
            }
        };
        MainEditorPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        MainEditorPanel.prototype.panelEventChanger = function (value) {
            this.setRect(value);
            this.refrishSize();
        };
        MainEditorPanel.prototype.refrishSize = function () {
            this.resize();
            if (this.uiLoadComplete) {
                var roundNum = 1;
                this.a_scene_view.x = roundNum;
                this.a_scene_view.y = roundNum;
                this.a_scene_view.width = this.pageRect.width - roundNum * 2;
                this.a_scene_view.height = this.pageRect.height - roundNum * 2;
            }
        };
        return MainEditorPanel;
    }(win.BaseWindow));
    maineditor.MainEditorPanel = MainEditorPanel;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=MainEditorPanel.js.map