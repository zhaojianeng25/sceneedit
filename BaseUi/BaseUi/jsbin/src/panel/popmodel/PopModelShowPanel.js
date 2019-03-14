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
var popmodel;
(function (popmodel) {
    var UICompenent = Pan3d.UICompenent;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var MouseType = Pan3d.MouseType;
    var ByteArray = Pan3d.Pan3dByteArray;
    var UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent;
    var ModelShowModel = left.ModelShowModel;
    var ObjData = Pan3d.ObjData;
    var Shader3D = Pan3d.Shader3D;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var Scene_data = Pan3d.Scene_data;
    var Vector2D = Pan3d.Vector2D;
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
    popmodel.BloomUiShader = BloomUiShader;
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
    popmodel.modelShowRender = modelShowRender;
    var PopModelShowPanel = /** @class */ (function (_super) {
        __extends(PopModelShowPanel, _super);
        function PopModelShowPanel() {
            var _this = _super.call(this) || this;
            _this.modelPic = new modelShowRender();
            _this.addRender(_this.modelPic);
            _this.initView();
            return _this;
        }
        PopModelShowPanel.prototype.loadConfigCom = function () {
            _super.prototype.loadConfigCom.call(this);
            this.setUiListVisibleByItem([this.a_scroll_bar_bg], false);
            this.setUiListVisibleByItem([this.b_win_close], true);
        };
        PopModelShowPanel.prototype.butClik = function (evt) {
            if (evt.target == this.b_win_close) {
                this.perent.removeUIContainer(this);
            }
        };
        PopModelShowPanel.prototype.initView = function () {
            var _this = this;
            var ui = new UICompenent();
            ui.width = 150;
            ui.height = 150;
            ui.x = 0;
            ui.y = 0;
            ui.name = "renderui";
            ui.uiRender = this.modelPic;
            this.addChild(ui);
            this.showModelPicUI = ui;
            this.modelPic.setImgUrl("pan/marmoset/uilist/1024.jpg");
            ModelShowModel.getInstance()._bigPic = this.modelPic;
            ModelShowModel.getInstance().addBaseModel();
            this.showModelPicUI.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            document.addEventListener(MouseType.MouseWheel, function ($evt) { _this.onMouseWheel($evt); });
        };
        PopModelShowPanel.prototype.onMouseWheel = function ($evt) {
            console.log(this.pageRect.isHitByPoint($evt.x, $evt.y), this.hasStage);
            if (this.pageRect.isHitByPoint($evt.x, $evt.y) && this.hasStage) {
                Scene_data.cam3D.distance += ($evt.wheelDelta * Scene_data.cam3D.distance) / 1000;
            }
        };
        PopModelShowPanel.prototype.tittleMouseDown = function (evt) {
            if (this.showModelPicUI == evt.target) {
                this.lastPagePos = new Vector2D(Scene_data.focus3D.rotationX, Scene_data.focus3D.rotationY);
            }
            _super.prototype.tittleMouseDown.call(this, evt);
        };
        PopModelShowPanel.prototype.mouseOnTittleMove = function (evt) {
            switch (this.mouseMoveTaget) {
                case this.showModelPicUI:
                    Scene_data.focus3D.rotationX = this.lastPagePos.x - (evt.y - this.lastMousePos.y);
                    Scene_data.focus3D.rotationY = this.lastPagePos.y - (evt.x - this.lastMousePos.x);
                    break;
                default:
                    _super.prototype.mouseOnTittleMove.call(this, evt);
                    break;
            }
        };
        PopModelShowPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.uiLoadComplete) {
                var minW = Math.min(this.pageRect.width - 20, this.pageRect.height - this.a_tittle_bg.height - 20);
                this.showModelPicUI.width = minW;
                this.showModelPicUI.height = minW;
                this.showModelPicUI.x = (this.pageRect.width - minW) / 2;
                this.showModelPicUI.y = (this.pageRect.height - this.a_tittle_bg.height - minW) / 2 + this.a_tittle_bg.height;
            }
        };
        PopModelShowPanel.prototype.selectInputDae = function (evt) {
            var _this = this;
            this._inputHtmlSprite = document.createElement('input');
            this._inputHtmlSprite.setAttribute('id', '_ef');
            this._inputHtmlSprite.setAttribute('type', 'file');
            this._inputHtmlSprite.setAttribute("style", 'visibility:hidden');
            this._inputHtmlSprite.click();
            this._inputHtmlSprite.value;
            this._inputHtmlSprite.addEventListener("change", function (cevt) { _this.changeFile(cevt); });
        };
        PopModelShowPanel.prototype.changeFile = function (evt) {
            var _this = this;
            for (var i = 0; i < this._inputHtmlSprite.files.length && i < 1; i++) {
                var simpleFile = this._inputHtmlSprite.files[i];
                if (!/image\/\w+/.test(simpleFile.type)) {
                    var $reader = new FileReader();
                    if (simpleFile.name.indexOf(".md5mesh") != -1) {
                        $reader.readAsText(simpleFile);
                        $reader.onload = function ($temp) {
                            ModelShowModel.getInstance().webmd5Sprite.addLocalMeshByStr($reader.result);
                        };
                        return;
                    }
                    if (simpleFile.name.indexOf(".md5anim") != -1) {
                        $reader.readAsText(simpleFile);
                        $reader.onload = function ($temp) {
                            ModelShowModel.getInstance().webmd5Sprite.addLocalAdimByStr($reader.result);
                            ModelShowModel.getInstance().changeWebModel();
                        };
                        return;
                    }
                    if (simpleFile.name.indexOf("objs.txt") != -1) {
                        $reader.readAsText(simpleFile);
                        $reader.onload = function ($temp) {
                            ModelShowModel.getInstance().readTxtToModelBy($reader.result);
                        };
                    }
                    else {
                        // alert("objs.txt结尾对象0" + simpleFile.name);
                        $reader.readAsArrayBuffer(simpleFile);
                        $reader.onload = function ($temp) {
                            if (_this.isRoleFile($reader.result)) {
                                console.log("是角色", simpleFile.name);
                                filemodel.RoleChangeModel.getInstance().loadLocalFile($reader.result);
                                left.SceneRenderToTextrue.getInstance().viweLHnumber = 1000;
                            }
                            else {
                                alert("不确定类型");
                            }
                        };
                    }
                }
                else {
                    alert("请确保文件类型为图像类型");
                }
            }
            this._inputHtmlSprite = null;
        };
        PopModelShowPanel.prototype.isRoleFile = function (arrayBuffer) {
            var $byte = new ByteArray(arrayBuffer);
            $byte.position = 0;
            var $version = $byte.readInt();
            var $url = $byte.readUTF();
            if ($url.indexOf("role/") != -1) {
                return true;
            }
            else {
                return false;
            }
        };
        return PopModelShowPanel;
    }(base.BaseWindow));
    popmodel.PopModelShowPanel = PopModelShowPanel;
})(popmodel || (popmodel = {}));
//# sourceMappingURL=PopModelShowPanel.js.map