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
    var Scene_data = Pan3d.Scene_data;
    var TextureManager = Pan3d.TextureManager;
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIConatiner = Pan3d.UIConatiner;
    var UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var UIAtlas = Pan3d.UIAtlas;
    var Shader3D = Pan3d.Shader3D;
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
            _this.pageRect = new Rectangle(0, 0, 500, 500);
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._sceneViewRender = new modelShowRender();
            _this.addRender(_this._sceneViewRender);
            _this._bottomRender.uiAtlas = new UIAtlas();
            _this._bottomRender.uiAtlas.setInfo("ui/window/window.txt", "ui/window/window.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        MainEditorPanel.prototype.loadConfigCom = function () {
            this._topRender.uiAtlas = this._bottomRender.uiAtlas;
            this.a_win_tittle = this.addEvntBut("a_tittle_bg", this._topRender);
            this.a_win_tittle.x = 0;
            this.a_win_tittle.y = 0;
            this.a_win_bg = this.addEvntBut("a_bg", this._bottomRender);
            this.a_win_bg.x = 0;
            this.a_win_bg.y = 25;
            //a_scene_view
            this.initView();
            //  this.setUiListVisibleByItem([this.a_win_tittle], false);
            this.uiLoadComplete = true;
            this.refrishSize();
        };
        MainEditorPanel.prototype.initView = function () {
            var _this = this;
            this._sceneViewRender.uiAtlas = this._topRender.uiAtlas;
            this.a_scene_view = this.addChild(this._sceneViewRender.getComponent("a_scene_view"));
            TextureManager.getInstance().getTexture("res/shuangdaonv.jpg", function ($texture) {
                _this._sceneViewRender.textureRes = $texture;
                Pan3d.TimeUtil.addFrameTick(function (t) { _this.upFrame(t); });
            });
        };
        MainEditorPanel.prototype.upFrame = function (t) {
            maineditor.MainEditorProcessor.edItorSceneManager.textureRes = this._sceneViewRender.textureRes;
            var cam3D = maineditor.MainEditorProcessor.edItorSceneManager.cam3D;
            cam3D.cavanRect.x = this.a_scene_view.x + this.left;
            cam3D.cavanRect.y = this.a_scene_view.y + this.top;
            cam3D.cavanRect.width = this.a_scene_view.width;
            cam3D.cavanRect.height = this.a_scene_view.height;
            maineditor.MainEditorProcessor.edItorSceneManager.renderToTexture();
        };
        MainEditorPanel.prototype.butClik = function (evt) {
            if (this.perent) {
            }
        };
        MainEditorPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        MainEditorPanel.prototype.panelEventChanger = function (value) {
            if (this.pageRect) {
                this.pageRect.height = value.height;
                this.pageRect.width = value.width;
                this.left = value.x;
                this.top = value.y;
                this.refrishSize();
            }
        };
        MainEditorPanel.prototype.refrishSize = function () {
            if (this.uiLoadComplete) {
                this.a_win_bg.width = this.pageRect.width;
                this.a_win_bg.height = this.pageRect.height - 25;
                this.a_win_tittle.width = this.pageRect.width;
                this._bottomRender.applyObjData();
                this._topRender.applyObjData();
                var roundNum = 0;
                this.a_scene_view.x = roundNum;
                this.a_scene_view.y = roundNum + 25;
                this.a_scene_view.width = this.pageRect.width - roundNum * 2;
                this.a_scene_view.height = this.pageRect.height - 25 - roundNum * 2;
            }
            this.resize();
        };
        return MainEditorPanel;
    }(UIConatiner));
    maineditor.MainEditorPanel = MainEditorPanel;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=MainEditorPanel.js.map