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
    var TimeUtil = Pan3d.me.TimeUtil;
    var LineDisplayShader = Pan3d.me.LineDisplayShader;
    var GridLineSprite = Pan3d.me.GridLineSprite;
    var ProgrmaManager = Pan3d.me.ProgrmaManager;
    var BaseDiplay3dSprite = Pan3d.me.BaseDiplay3dSprite;
    var Camera3D = Pan3d.me.Camera3D;
    var Rectangle = Pan3d.me.Rectangle;
    //import MaterialRoleSprite = left.MaterialRoleSprite;
    //import ModelSprite = maineditor.ModelSprite;
    //import SkillSpriteDisplay = maineditor.SkillSpriteDisplay;
    //import LyfSpriteDisplay = maineditor.LyfSpriteDisplay;
    //import EdItorSceneManager = maineditor.EdItorSceneManager;
    var MeshSceneView2DUI = /** @class */ (function (_super) {
        __extends(MeshSceneView2DUI, _super);
        function MeshSceneView2DUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MeshSceneView2DUI.prototype.initView = function () {
            this.textLabelUI = new prop.TextLabelUI(64, 16);
            this.textureUrlText = new prop.TextLabelUI(200, 16);
            this.texturePicUi = new prop.TexturePicUi(128, 128);
            this.propPanle.addBaseMeshUi(this.textLabelUI);
            this.propPanle.addBaseMeshUi(this.textureUrlText);
            this.propPanle.addBaseMeshUi(this.texturePicUi);
            this.texturePicUi.url = "icon/base.jpg";
            this.height = 200;
            this.initScene();
        };
        MeshSceneView2DUI.prototype.initScene = function () {
            var _this = this;
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            this.sceneManager = new maineditor.EdItorSceneManager();
            var temp = new GridLineSprite();
            this.sceneManager.addDisplay(temp);
            this.sceneManager.addDisplay(new BaseDiplay3dSprite());
            this.sceneManager.ready = true;
            this.sceneManager.cam3D = new Camera3D();
            this.sceneManager.cam3D.cavanRect = new Rectangle(0, 0, 128, 128);
            this.sceneManager.cam3D.distance = 200;
            this.sceneManager.focus3D.rotationY = random(360);
            this.sceneManager.focus3D.rotationX = -45;
            this.upDataFun = function () { _this.oneByFrame(); };
            TimeUtil.addFrameTick(this.upDataFun);
        };
        MeshSceneView2DUI.prototype.oneByFrame = function () {
            if (this.texturePicUi && this.texturePicUi.textureContext && this.texturePicUi.textureContext.hasStage) {
                console.log("here", TimeUtil.getTimer());
                Pan3d.me.MathClass.getCamView(this.sceneManager.cam3D, this.sceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                this.sceneManager.renderToTexture();
                var $uiRender = this.texturePicUi.textureContext.ui.uiRender;
                this.sceneManager.focus3D.rotationY++;
                if ($uiRender.uiAtlas.textureRes) {
                    $uiRender.uiAtlas.textureRes.texture = this.sceneManager.fbo.texture;
                }
            }
        };
        MeshSceneView2DUI.prototype.destory = function () {
            this.textLabelUI.destory();
            this.textureUrlText.destory();
            this.texturePicUi.destory();
            this.texturePicUi = null;
            TimeUtil.removeTimeTick(this.upDataFun);
        };
        Object.defineProperty(MeshSceneView2DUI.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        MeshSceneView2DUI.prototype.refreshViewValue = function () {
            var $url = String(this.target[this.FunKey]);
            this.texturePicUi.url = $url;
            var $arr = $url.split("/");
            this.textureUrlText.label = $arr[$arr.length - 1];
        };
        Object.defineProperty(MeshSceneView2DUI.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.textLabelUI.x = this._x + 0;
                this.texturePicUi.x = this._x + 60;
                this.textureUrlText.x = this._x + 60;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MeshSceneView2DUI.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this.textLabelUI.y = this._y;
                this.texturePicUi.y = this._y + 5;
                this.textureUrlText.y = this._y + 128 + 20;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MeshSceneView2DUI.prototype, "label", {
            get: function () {
                return this._label;
            },
            set: function (value) {
                this._label = value;
                this.textLabelUI.label = value;
            },
            enumerable: true,
            configurable: true
        });
        return MeshSceneView2DUI;
    }(prop.BaseReflComponent));
    prop.MeshSceneView2DUI = MeshSceneView2DUI;
})(prop || (prop = {}));
//# sourceMappingURL=MeshSceneView2DUI.js.map