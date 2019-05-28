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
var prop;
(function (prop) {
    var Rectangle = Pan3d.Rectangle;
    var Shader3D = Pan3d.Shader3D;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Later2DShader = /** @class */ (function (_super) {
        __extends(Later2DShader, _super);
        function Later2DShader() {
            return _super.call(this) || this;
        }
        Later2DShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
        };
        Later2DShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Pos;" +
                "attribute vec2 v2uv;" +
                "varying vec2 v_texCoord;" +
                "void main(void)" +
                "{" +
                "v_texCoord = vec2(v2uv.x,v2uv.y);" +
                "gl_Position =vec4(v3Pos.x,v3Pos.y,v3Pos.z,1.0);" +
                "}";
            return $str;
        };
        Later2DShader.prototype.getFragmentShaderString = function () {
            var $str = " precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "gl_FragColor = infoUv;\n" +
                "}";
            return $str;
        };
        Later2DShader.Later2DShader = "Later2DShader";
        return Later2DShader;
    }(Shader3D));
    prop.Later2DShader = Later2DShader;
    var MeshMaterialLfetView2DUI = /** @class */ (function (_super) {
        __extends(MeshMaterialLfetView2DUI, _super);
        function MeshMaterialLfetView2DUI(value) {
            var _this = _super.call(this, value) || this;
            _this.defFileUrl = "assets/objs/ball.objs";
            return _this;
        }
        MeshMaterialLfetView2DUI.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.iconItem = [];
            for (var i = 0; i < 5; i++) {
                var tempUi = new prop.TexturePicUi(24, 24);
                this.propPanle.addBaseMeshUi(tempUi);
                this.drawUrlImgToUi(tempUi.ui, "icon/modelicon/" + (i + 1) + ".png");
                tempUi.ui.addEventListener(InteractiveEvent.Down, this.butClik, this);
                this.iconItem.push(tempUi);
            }
        };
        MeshMaterialLfetView2DUI.prototype.butClik = function (evt) {
            _super.prototype.butClik.call(this, evt);
            for (var i = 0; i < this.iconItem.length; i++) {
                if (this.iconItem[i].ui == evt.target) {
                    switch (i) {
                        case 0:
                            this.setObjUrlToSprite("assets/objs/box.objs");
                            break;
                        case 1:
                            this.setObjUrlToSprite("assets/objs/cylinder.objs");
                            break;
                        case 2:
                            this.setObjUrlToSprite("assets/objs/plant.objs");
                            break;
                        case 3:
                            this.setObjUrlToSprite("assets/objs/ball.objs");
                            break;
                        case 4:
                            this.setObjUrlToSprite("assets/objs/tuzhi.objs");
                            break;
                        default:
                            break;
                    }
                }
            }
        };
        Object.defineProperty(MeshMaterialLfetView2DUI.prototype, "x", {
            set: function (value) {
                this._x = value;
                this.textLabelUI.x = this._x + 100000;
                this.texturePicUi.x = this._x + 10;
                this.textureUrlText.x = this._x + 10000;
                this.resize();
            },
            enumerable: true,
            configurable: true
        });
        MeshMaterialLfetView2DUI.prototype.resize = function () {
            if (this._width && this.texturePicUi) {
                //this._x = (this._width - 200) / 2;
                //this.texturePicUi.x = this._x;
                //this.texturePicUi.y = this._y + 5
                this._height = this._width;
                var showSize = this._width - 2;
                this.texturePicUi.ui.width = showSize;
                this.texturePicUi.ui.height = showSize;
                this._x = (this._width - showSize) / 2;
                this.texturePicUi.x = this._x + 0;
                this.texturePicUi.y = this._y + 0;
                for (var i = 0; i < this.iconItem.length; i++) {
                    this.iconItem[i].x = this._x + 3 + 30 * i;
                    this.iconItem[i].y = this._y + 2;
                }
            }
            this.destory;
        };
        MeshMaterialLfetView2DUI.prototype.destory = function () {
            while (this.iconItem.length) {
                var tempUi = this.iconItem.pop();
                tempUi.destory();
            }
            _super.prototype.destory.call(this);
        };
        MeshMaterialLfetView2DUI.prototype.texturePicUiChange = function ($evt) {
            var temp = this.target[this.FunKey];
            temp.showurl = this.texturePicUi.url;
            this.refrishShowMaterialModel(temp);
        };
        MeshMaterialLfetView2DUI.prototype.refrishShowMaterialModel = function (material) {
            var _this = this;
            var fileUrl = material.showurl;
            if (!fileUrl) {
                fileUrl = this.defFileUrl;
            }
            var tempArr = fileUrl.split(".");
            var stuffstr = tempArr[tempArr.length - 1];
            switch (stuffstr) {
                case "prefab":
                    pack.PackPrefabManager.getInstance().getPrefabByUrl(fileUrl, function (prefabStaticMesh) {
                        _this.setObjUrlToSprite(prefabStaticMesh.objsurl);
                    });
                    break;
                case "objs":
                    this.setObjUrlToSprite(fileUrl);
                    break;
                default:
                    console.log("没有处理的类型", stuffstr);
                    this.setZzwUrlToRole(fileUrl);
                    break;
            }
        };
        MeshMaterialLfetView2DUI.prototype.initScene = function () {
            _super.prototype.initScene.call(this);
            this.latersceneManager = new maineditor.LaterSceneManager();
        };
        MeshMaterialLfetView2DUI.prototype.setZzwUrlToRole = function (zzwUrl) {
            var _this = this;
            if (!this.roleSprite) {
                this.roleSprite = new left.MaterialRoleSprite();
                this.sceneManager.addMovieDisplay(this.roleSprite);
            }
            pack.PackRoleManager.getInstance().getRoleZzwByUrl(zzwUrl, function (value) {
                _this.roleSprite.animDic = value.animDic;
                _this.roleSprite.skinMesh = value.skinMesh.clone();
                var temp = _this.target[_this.FunKey];
                for (var i = 0; i < _this.roleSprite.skinMesh.meshAry.length; i++) {
                    _this.roleSprite.skinMesh.meshAry[i].material = temp;
                    _this.roleSprite.skinMesh.meshAry[i].materialParam = null;
                }
                _this.roleSprite.curentAction = "walk";
                _this.roleSprite.sceneVisible = true;
                if (_this.modelSprite) {
                    _this.modelSprite.sceneVisible = false;
                }
            });
        };
        MeshMaterialLfetView2DUI.prototype.oneByFrame = function () {
            if (this.texturePicUi && this.texturePicUi.textureContext && this.texturePicUi.textureContext.hasStage) {
                Pan3d.MathClass.getCamView(this.sceneManager.cam3D, this.sceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                this.sceneManager.renderToTexture();
                this.latersceneManager.renderToTexture();
                var $uiRender = this.texturePicUi.textureContext.ui.uiRender;
                $uiRender.uiAtlas.textureRes.texture = this.sceneManager.fbo.texture;
                var maxNum = Math.min(this.texturePicUi.textureContext.ui.width, this.texturePicUi.textureContext.ui.height);
                this.sceneManager.cam3D.cavanRect = new Rectangle(0, 0, maxNum, maxNum);
            }
        };
        Object.defineProperty(MeshMaterialLfetView2DUI.prototype, "width", {
            set: function (value) {
                this._width = value;
                this.resize();
            },
            enumerable: true,
            configurable: true
        });
        MeshMaterialLfetView2DUI.prototype.setObjUrlToSprite = function (objurl) {
            var _this = this;
            if (!this.modelSprite) {
                this.modelSprite = new left.MaterialModelSprite();
                this.sceneManager.addDisplay(this.modelSprite);
            }
            this.lastObjUrl = objurl;
            pack.PackObjDataManager.getInstance().getObjDataByUrl(objurl, function (value) {
                console.log("更新模型", objurl);
                if (!_this.modelSprite.objData || _this.lastObjUrl == objurl) {
                    _this.modelSprite.objData = value;
                }
                _this.modelSprite.sceneVisible = true;
                if (_this.roleSprite) {
                    _this.roleSprite.sceneVisible = false;
                }
            });
        };
        MeshMaterialLfetView2DUI.prototype.refreshViewValue = function () {
            var temp = this.target[this.FunKey];
            this.texturePicUi.url = "icon/base.jpg";
            this.setObjUrlToSprite(this.defFileUrl); //选给默认对象
            this.modelSprite.material = temp;
            this.refrishShowMaterialModel(temp);
        };
        return MeshMaterialLfetView2DUI;
    }(prop.MeshSceneView2DUI));
    prop.MeshMaterialLfetView2DUI = MeshMaterialLfetView2DUI;
})(prop || (prop = {}));
//# sourceMappingURL=MeshMaterialLfetView2DUI.js.map