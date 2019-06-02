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
var mars3D;
(function (mars3D) {
    var Vector2D = Pan3d.Vector2D;
    var Object3D = Pan3d.Object3D;
    var MouseType = Pan3d.MouseType;
    var LineDisplayShader = Pan3d.LineDisplayShader;
    var GridLineSprite = Pan3d.GridLineSprite;
    var Camera3D = Pan3d.Camera3D;
    var Rectangle = Pan3d.Rectangle;
    var LoadManager = Pan3d.LoadManager;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var Scene_data = Pan3d.Scene_data;
    var EdItorSceneManager = maineditor.EdItorSceneManager;
    var Laya3dSprite = LayaPan3D.Laya3dSprite;
    var LayaSceneChar = layapan_me.LayaSceneChar;
    var Marmoset3dScene = /** @class */ (function (_super) {
        __extends(Marmoset3dScene, _super);
        function Marmoset3dScene(value, bfun) {
            if (bfun === void 0) { bfun = null; }
            var _this = _super.call(this, value, bfun) || this;
            _this.selectId = 0;
            mars3D.MarmosetModel.getInstance().initData();
            _this.addEvents();
            //this.addBaseChar();
            //joelamp
            //benjamin
            //karen1
            //karen2
            var strItem = [];
            strItem.push("benjamin.mview"); //0
            strItem.push("henrique.mview"); //1
            strItem.push("joelamp.mview"); //2
            strItem.push("karen1.mview"); //3
            strItem.push("karen2.mview"); //4
            strItem.push("natmother.mview"); //5
            strItem.push("tom.mview"); //6
            strItem.push("ViewerNormalesLow-Unreas.mview"); //7
            strItem.push("ViewerArachne2.mview"); //8
            strItem.push("meet_mat.mview"); //9
            strItem.push("vivfox.mview"); //10
            strItem.push("peter.mview"); //11
            strItem.push("test2.mview"); //12
            strItem.push("lens.mview"); //13
            strItem.push("vespa.mview"); //14
            strItem.push("camera.mview"); //15
            strItem.push("masks3.mview"); //16
            strItem.push("17.mview"); //17
            strItem.push("LightingScenario2.mview"); //18
            strItem.push("Shinobi.mview"); //19
            strItem.push("sceneguillau.mview"); //20
            strItem.push("phillstead_ww_MV_25.mview"); //21
            strItem.push("scene_glad.mview"); //22
            strItem.push("WildWestNative.mview"); //23
            strItem.push("sceneDaria.mview"); //24
            strItem.push("wwsurvivors.mview"); //25
            var txtshaderName = "shader1087_1";
            LoadManager.getInstance().load(Scene_data.fileuiRoot + "pan/marmoset/v" + txtshaderName + ".txt", LoadManager.XML_TYPE, function (vstr) {
                mars3D.MarmosetModel.changerVshader = vstr;
                LoadManager.getInstance().load(Scene_data.fileuiRoot + "pan/marmoset/f" + txtshaderName + ".txt", LoadManager.XML_TYPE, function (fstr) {
                    mars3D.MarmosetModel.changerFshader = fstr;
                    marmoset.embed("res/" + strItem[3], { width: 500, height: 400, autoStart: true, fullFrame: false, pagePreset: false });
                });
            });
            return _this;
        }
        Marmoset3dScene.prototype.initScene = function () {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            this.sceneManager = new EdItorSceneManager();
            var temp = new GridLineSprite();
            this.sceneManager.addDisplay(temp);
            this.mianpian = new mars3D.PicShowDiplay3dSprite();
            this.mianpian.scale = 10;
            this.sceneManager.addDisplay(this.mianpian);
            this.sceneManager.ready = true;
            this.sceneManager.cam3D = new Camera3D();
            this.sceneManager.cam3D.cavanRect = new Rectangle(0, 0, 512, 512);
            this.sceneManager.cam3D.distance = 200;
            this.sceneManager.focus3D.rotationY = random(360);
            this.sceneManager.focus3D.rotationX = -45;
        };
        Marmoset3dScene.prototype.addBaseChar = function () {
            var $baseChar = new LayaSceneChar();
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            this.sceneManager.addMovieDisplay($baseChar);
        };
        Marmoset3dScene.prototype.addEvents = function () {
            this.on(MouseType.MouseDown, this, this.onStartDrag);
            this.on(MouseType.MouseWheel, this, this.onMouseWheel);
            Laya.stage.on(MouseType.MouseUp, this, this.onMouseUp);
            Laya.stage.on(MouseType.MouseMove, this, this.onMouseMove);
            Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onStageKeyDonw);
        };
        Marmoset3dScene.prototype.onStageKeyDonw = function (evt) {
            if (evt.keyCode == Pan3d.KeyboardType.F) {
                mars3D.MarmosetModel.getInstance().upFileToSvever();
            }
        };
        Marmoset3dScene.prototype.onMouseWheel = function (e) {
            this.sceneManager.cam3D.distance += e.delta;
        };
        Marmoset3dScene.prototype.onStartDrag = function (e) {
            if (this.mouseY < 30) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            }
            else {
                this.lastMouseVec2d = new Vector2D(this.mouseX, this.mouseY);
                this.lastfocus3D = new Object3D();
                this.lastfocus3D.rotationY = this.sceneManager.focus3D.rotationY;
                this.lastfocus3D.rotationX = this.sceneManager.focus3D.rotationX;
            }
        };
        Marmoset3dScene.prototype.onMouseUp = function (e) {
            this.lastMouseVec2d = null;
            var len = mars3D.MarmosetModel.getInstance().textureItem.length;
            if (this.mianpian._uvTextureRes && len) {
                this.mianpian._uvTextureRes.texture = mars3D.MarmosetModel.getInstance().textureItem[this.selectId % len];
                this.selectId++;
            }
        };
        Marmoset3dScene.prototype.onMouseMove = function (e) {
            if (this.lastMouseVec2d) {
                this.sceneManager.focus3D.rotationY = this.lastfocus3D.rotationY - (this.mouseX - this.lastMouseVec2d.x);
                this.sceneManager.focus3D.rotationX = this.lastfocus3D.rotationX - (this.mouseY - this.lastMouseVec2d.y) / 10;
            }
        };
        Marmoset3dScene.prototype.upData = function () {
            if (this.sceneManager) {
                Pan3d.MathClass.getCamView(this.sceneManager.cam3D, this.sceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                _super.prototype.upData.call(this);
            }
        };
        return Marmoset3dScene;
    }(Laya3dSprite));
    mars3D.Marmoset3dScene = Marmoset3dScene;
})(mars3D || (mars3D = {}));
//# sourceMappingURL=Marmoset3dScene.js.map